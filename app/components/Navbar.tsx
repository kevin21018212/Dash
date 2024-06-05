'use client';

import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import styles from './navbar.module.scss';
import {Project} from '@prisma/client';
import Loading from './global/function/Loading';

const Navbar = () => {
  const {data: session} = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    if (session) {
      try {
        const response = await fetch('/api/project');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error('Error fetching projects:', data.error);
        }
      } catch (error) {
        console.error('Fetch projects failed:', error);
      }
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
      <div className={styles.mainLinksContainer}>
        <Link href='/' className={styles.navLink}>
          Home
        </Link>
        <Link href='/Dashboard' className={styles.navLink}>
          Dashboard
        </Link>
      </div>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <Link key={project.project_id} href={`/projects/${project.project_id}`} className={styles.navLink}>
            {project.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
