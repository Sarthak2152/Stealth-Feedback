import React from "react";
import Link from "next/link";
import { ToggleTheme } from "../ToggleTheme";
import AuthButton from "./AuthButton";
export const Navbar = () => {
  return (
    <div className="w-full border-b flex justify-between items-center py-4 px-6">
      <Link
        className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl"
        href="/">
        Stealth Chat
      </Link>
      <div className="flex gap-3 items-center">
        <AuthButton />
        <ToggleTheme />
      </div>
    </div>
  );
};
