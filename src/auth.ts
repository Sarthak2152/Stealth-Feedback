import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import UserModel from "./models/User";
import { compare } from "bcryptjs";
import { loginSchema } from "@/schema/loginSchema";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { fromZodError } from "zod-validation-error";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github({
      clientId: "fnksdfkdskfjksdjfkds",
      clientSecret: "jkdsjfkdsjfkjk",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (Credentials) => {
        await dbConnect();
        try {
          const parsedCredentials = loginSchema.safeParse(Credentials);
          if (parsedCredentials.error) {
            throw new Error(fromZodError(parsedCredentials.error).toString());
          }
          const { username, password } = parsedCredentials.data;

          const user = await UserModel.findOne({ username });

          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("User not verified");
          }
          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }
          return {
            _id: user.id,
            username: user.username,
            email: user.email,
            isAcceptingMessages: user.isAcceptingMessages,
            isVerified: user.isVerified,
          };
        } catch (error: any) {
          console.log("🚀 ~ error:", error);
          throw new Error(error);
        }
      },
    }),
    google({
      clientId: "fnksdfkdskfjksdjfkds",
      clientSecret: "jkdsjfkdsjfkjk",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = <string>token._id;
        session.user.username = <string>token.username;
        session.user.isAcceptingMessages = <boolean>token.isAcceptingMessages;
        session.user.isVerified = <boolean>token.isVerified;
      }
      return session;
    },
  },
});
