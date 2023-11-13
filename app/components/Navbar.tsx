"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { data: session } = useSession() as { data: any };

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut();
    } else {
      await signIn("email", { callbackUrl: "/dashboard" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <button onClick={handleSignClick} className={styles.signButton}>
          {session && session.user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
