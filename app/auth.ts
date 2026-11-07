import { loginSchema } from "./../lib/validations/auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/db/dbConnection";
import User from "@/lib/Schemas/userSchema";

const credentials = Credentials({
  credentials: {
    email: {},
    password: {},
  },

  authorize: async (credentials) => {
    // data validation with zod safeParse
    const parsed = loginSchema.safeParse(credentials);
    // return null if data is not valid
    if (!parsed.success) return null;
    await connectDB();
    // find user with email
    const user = await User.findOne({ email: parsed.data.email }).select(
      "+password",
    );
    // if user is not present return null
    if (!user) return null;
    const isMatched = await user.comparePassword(parsed.data.password);
    // return null if db hased password & credentials password is not match
    if (!isMatched) return null;
    const { id, name, email, image, role } = user;
    return {
      id,
      name,
      email,
      image,
      role,
    };
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, credentials],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        if (!user.email) return false;
        //find the user in db if not found create user
        await User.findOneAndUpdate(
          { email: user.email },
          {
            $setOnInsert: {
              provider: "google",
              name: user.name ?? "",
              email: user.email,
              image: user.image ?? "",
            },
          },
          { upsert: true, new: true },
        );
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = String(token.role);
      return session;
    },
  },
});
