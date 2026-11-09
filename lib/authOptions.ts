import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "./Schemas/userSchema";
import { loginSchema } from "./validations/auth";
import connectDB from "./db/dbConnection";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (parsed.success) {
          await connectDB();
          const user = await User.findOne({
            email: parsed.data.email,
          }).select("+password");
          if (user) {
            const isMatched = await user.comparePassword(parsed.data.password);
            if (isMatched) {
              const { id, name, email, image, role } = user;
              return {
                id,
                name,
                email,
                image,
                role,
              };
            }
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    signIn({ account, user }) {
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
