import React from "react";
import styles from "./projectCard.module.scss";

const ProjectCard = ({ title, description, link, imageUrl }) => {
  return (
    <div className={styles.projectCard}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Project Link
        </a>
      )}
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
    </div>
  );
};

export default ProjectCard;
