import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import UserModel from "./models/User";
import { compare } from "bcryptjs";
import { loginSchema } from "@/schema/loginSchema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (Credentials) => {
        let user = null;
        await dbConnect();
        try {
          const { username, password } = loginSchema.parse(Credentials);
          user = await UserModel.findOne({ username });
          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("User not verified");
          }
          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            throw new Error("Incorrect username or password");
          }
          return user;
        } catch (error) {
          console.log("🚀 ~ error:", error);
          return null;
        }
      },
    }),
  ],
});
