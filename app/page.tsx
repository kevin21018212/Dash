"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./homepage.module.css";
import CreateComponent from "./components/cards/form/create";

const Page = () => {
  const { data: session } = useSession();

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.landing}>
        {session && session.user ? (
          <div className={styles.favoritesSection}>
            <h2>Favorited Tasks and Features</h2>
            {/* Placeholder for favorited tasks and features */}
            <p>Display favorited tasks and features here.</p>
          </div>
        ) : (
          <div className={styles.loginSection}>
            <h2>Welcome to the Dashboard</h2>
            <button onClick={handleSignClick} className={styles.signButton}>
              {session && session.user ? "Sign Out" : "Sign In"}
            </button>
          </div>
        )}
      </div>
      <div className={styles.createProjectSection}>
        <h2>Create a New Project</h2>
        <CreateComponent type="project" parentId={null} />
      </div>
    </div>
  );
};

export default Page;
