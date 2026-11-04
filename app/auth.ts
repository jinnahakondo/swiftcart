import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const credentials = Credentials({
  credentials: {
    email: {},
    password: {},
  },

  authorize: async (credentials) => {
    const email = credentials?.email;
    const password = credentials?.password;
    console.log("credentials:", { email, password });
    return {
      name: "jinnahakondo",
    };
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, credentials],
  pages: {
    signIn: "/login",
  },
});
