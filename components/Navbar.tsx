"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainLinksContainer}>
        <Link href="/" className={styles.navLink}>
          <h6>Home</h6>
        </Link>
        <Link href="/Dashboard" className={styles.navLink}>
          <h6>Dashboard</h6>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
