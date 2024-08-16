"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./homepage.module.scss";
import common from "./common.module.scss";
import CreateComponent, { CreateProject } from "../components/global/form/create";
import ProjectCard from "../components/project/projectCard";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const { data: session } = useSession();

  const handleSignClick = async () => {
    session && session.user ? await signOut() : await signIn();
  };

  const fetchProjects = async () => {
    if (session) {
      try {
        const response = await fetch("/api/project");
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error("Error fetching projects:", data.error);
        }
      } catch (error) {
        console.error("Fetch projects failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [session]);

  return (
    <div className={common.pageContainer}>
      {session && session.user ? (
        <>
          <div className={styles.landing}>
            <div className={styles.favoritesSection}>
              <h2>Favorited Tasks and Features</h2>
              <p>Display favorited tasks and features here.</p>
            </div>
          </div>
          <div className={common.gridDisplayContainer}>
            <div className={styles.createCard}>
              <CreateProject onCancel={undefined} />
            </div>
            {projects.map((project: any) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to Taskly!</h1>
            <p className={styles.heroSubtitle}>Your playful partner in productivity</p>

            <div className={styles.featuresContainer}>
              <div className={styles.featureItem}>
                <img src="/icons/organize.svg" alt="Organize" className={styles.featureIcon} />
                <p>Organize with ease</p>
              </div>
              <div className={styles.featureItem}>
                <img src="/icons/collaborate.svg" alt="Collaborate" className={styles.featureIcon} />
                <p>Real-time collaboration</p>
              </div>
              <div className={styles.featureItem}>
                <img src="/icons/reminders.svg" alt="Reminders" className={styles.featureIcon} />
                <p>Never miss a deadline</p>
              </div>
              <div className={styles.featureItem}>
                <img src="/icons/analytics.svg" alt="Analytics" className={styles.featureIcon} />
                <p>Track your progress</p>
              </div>
            </div>

            <motion.button
              onClick={handleSignClick}
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let’s Get Started
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
