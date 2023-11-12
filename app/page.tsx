import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl text-[#7c6f5a]">TodoS</h1>
      </header>
      <div className="flex flex-row items-center gap-2">
        <Link
          href="/dashboard/login"
          className="border border-slate-300 bg-[#7c6f5a]/80 text-white active:bg-[#7c6f5a] rounded-lg px-2 py-1 outline-none focus-within:border-slate-100"
        >
          Login
        </Link>
        <Link
          href="/dashboard/signup"
          className="border border-slate-300 min-h-[20px] min-w-[40px] bg-[#7c6f5a]/80 text-white active:bg-[#7c6f5a]/80 rounded-lg px-2 py-1 outline-none focus-within:border-slate-100"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Page;
