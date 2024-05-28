"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./homepage.module.css";
import CreateComponent from "./components/cards/form/create";
import ProjectCard from "./components/cards/projectCard";
import { Project } from "@prisma/client";

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const { data: session } = useSession();

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  const fetchProjects = async () => {
    if (session) {
      const response = await fetch("/api/get/project");
      const data = await response.json();
      setProjects(data.projects);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [session]);

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
      <div className={styles.mainContent}>
        <div className={styles.createProjectSection}>
          <CreateComponent type="project" parentId={null} />
        </div>
        <div className={styles.projectCardsSection}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              imageUrl={project.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
