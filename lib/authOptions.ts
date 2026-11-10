import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "./Schemas/userSchema";
import { loginSchema } from "./validations/auth.schema";
import connectDB from "./db/dbConnection";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db/mongodb";

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
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          isEmailVerified: profile.email_verified,
          role: profile.role ?? "user",
        };
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
            delete user.password;
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        await connectDB();
        const isExist = await User.exists({
          email: user?.email,
          provider: "credentials",
        });
        if (isExist) {
          throw new Error("CredentialsAccountExists");
        }
      }
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
  pages: {
    signIn: "/login",
    error: "/login",
  },
  adapter: MongoDBAdapter(client),
};
