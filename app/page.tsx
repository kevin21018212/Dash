"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./homepage.module.css";
import ProjectCard from "./components/cards/projectCard";
import TaskCard from "./components/cards/taskCard";

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
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <ProjectCard />
        <TaskCard />
      </div>
      <button onClick={handleSignClick} className={styles.signButton}>
        {session && session.user ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default Page;
