import React from "react";
import Link from "next/link";
import styles from "./projectCard.module.scss";
import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className={styles.projectCard} onClick={(e) => e.preventDefault()}>
      <Link href={`/projects/${project.project_id}`} passHref>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()} // Prevent Link from handling this click
          >
            Project Link
          </a>
        )}
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className={styles.image}
          />
        )}
      </Link>
    </div>
  );
};

export default ProjectCard;
