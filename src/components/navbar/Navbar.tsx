import React from "react";
import Link from "next/link";
import { ToggleTheme } from "../ToggleTheme";
import AuthButton from "./AuthButton";
import Login from "./Login";
import Logout from "./Logout";
import { getUser } from "@/lib/getUser";

export const Navbar = async () => {
  const user = await getUser();
  return (
    <div className="w-full border-b flex justify-between items-center py-4 px-6">
      <Link
        className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl"
        href="/">
        Stealth Chat
      </Link>
      <div className="flex gap-3 items-center">
        <AuthButton>{!user ? <Login /> : <Logout />}</AuthButton>
        <ToggleTheme />
      </div>
    </div>
  );
};
