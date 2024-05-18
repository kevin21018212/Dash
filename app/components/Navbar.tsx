"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";

type Project = {
  project_id: number;
  title: string;
  description?: string;
  link?: string;
  image_url?: string;
};

const Navbar = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (session) {
        const response = await fetch("/api/get/project");
        const data = await response.json();
        setProjects(data.projects);
      }
    };

    fetchProjects();
  }, [session]);

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut();
    } else {
      await signIn();
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
        {session &&
          session.user &&
          projects.map((project) => (
            <Link
              key={project.project_id}
              href={`/projects/${project.project_id}`}
              className={styles.navLink}
            >
              {project.title}
            </Link>
          ))}
        <button onClick={handleSignClick} className={styles.signButton}>
          {session && session.user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
