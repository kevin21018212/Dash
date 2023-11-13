"use cilent";

import React from "react";
import styles from "./homepage.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TodoS</h1>
      </header>
    </div>
  );
};

export default Page;
