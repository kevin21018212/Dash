import React from 'react';
import styles from './projectCard.module.scss';
import common from '/app/common.module.scss';
import {Project} from '@prisma/client';
import {motion} from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({project}: ProjectCardProps) => {
  const backgroundImageStyle = project.image_url ? {backgroundImage: `url(${project.image_url})`, backgroundSize: 'cover'} : {};
  const handleClick = () => {
    window.location.href = `/projects/${project.project_id}`;
  };

  return (
    <motion.div whileHover={{scale: 1.1}} className={styles.projectCard} onClick={handleClick}>
      <div className={styles.topContent} style={backgroundImageStyle}>
        <h2 className={common.littleTitle}>{project.title}</h2>
      </div>
      <div className={styles.bottomContent}>
        {project.link && (
          <a href={project.link} target='_blank' rel='noopener noreferrer' className={styles.link} onClick={(e) => e.stopPropagation()}>
            Project Link
          </a>
        )}
        <p className={styles.description}>{project.description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
