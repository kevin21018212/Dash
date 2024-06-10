"use client";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider>{children} </Provider>
    </SessionProvider>
  );
};

export default Providers;
