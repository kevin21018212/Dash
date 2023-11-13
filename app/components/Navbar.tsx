"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { data: session } = useSession() as { data: any };

  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/dashboard/login" passHref>
          Login
        </Link>
        {session && (
          <button onClick={() => signOut()} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
