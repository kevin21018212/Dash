'use client';

import React, {useEffect, useState} from 'react';
import {signIn, signOut, useSession} from 'next-auth/react';
import styles from './homepage.module.scss';
import common from './common.module.scss';
import CreateComponent from './components/global/form/create';
import ProjectCard from './components/project/projectCard';
import {Project} from '@prisma/client';

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const {data: session} = useSession();

  const handleSignClick = async () => {
    session && session.user ? await signOut() : await signIn();
  };

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
              <CreateComponent type='project' parentId={null} onCancel={undefined} />
            </div>
            {projects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </>
      ) : (
        <div className={common.pageContainer}>
          <div className={styles.loginSection}>
            <h2>Welcome to the Dashboard</h2>
            <button onClick={handleSignClick} className={styles.signButton}>
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
