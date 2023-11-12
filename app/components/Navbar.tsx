"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession() as { data: Session };

  return (
    <div className="flex justify-between w-100 mx-8">
      <Link href="/" className="font-extrabold tracking-tight text-gray-900">
        TodoS
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session && (
          <button
            onClick={() => signOut()}
            className="border border-slate-300 w-[100px] bg-[#7c6f5a]/80 active:bg-[#7c6f5a] rounded-lg text-white outline-none focus-within:border-slate-100"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
