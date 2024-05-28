"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./navbar.module.scss";

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
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    if (session) {
      const response = await fetch("/api/get/project");
      const data = await response.json();
      setProjects(data.projects);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [session]);

  if (!session || !session.user || !projects) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <div className={styles.projectsContainer}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            projects.map((project) => (
              <Link
                key={project.project_id}
                href={`/projects/${project.project_id}`}
                className={styles.navLink}
              >
                {project.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
