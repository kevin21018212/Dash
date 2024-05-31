import React from "react";
import Link from "next/link";
import styles from "./projectCard.module.scss";
import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const backgroundImageStyle = project.image_url
    ? { backgroundImage: `url(${project.image_url})`, backgroundSize: "cover" }
    : { backgroundColor: "#0070f3" };
  const handleClick = () => {
    window.location.href = `/projects/${project.project_id}`;
  };

  return (
    <div className={styles.projectCard} onClick={handleClick}>
      <div className={styles.topContent} style={backgroundImageStyle}>
        <h1 className={styles.title}>{project.title}</h1>
      </div>
      <div className={styles.bottomContent}>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            Project Link
          </a>
        )}
        <p className={styles.description}>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
