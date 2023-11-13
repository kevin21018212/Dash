// Page.js

import Link from "next/link";
import React from "react";
import styles from "./homepage.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TodoS</h1>
      </header>
      <div className={styles.link}>
        <Link href="/dashboard/login" passHref>
          Login
        </Link>
        <Link href="/dashboard/signup" passHref>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Page;
