"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import prisma from "@/prisma/prisma";
import styles from "./projectPage.module.css"; // Import the CSS module
import FeatureCard from "@/app/components/cards/featureCard";
import FeatureDisplayCard from "@/app/components/cards/featureDisplayCard";
import { Feature } from "@prisma/client";

const ProjectPage = async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: { project_id: parseInt(params.id, 10) },
  });

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
};

const ProjectContent = ({ project }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch(
        `/api/get/feature?project_id=${project.project_id}`
      );
      const data = await response.json();
      setFeatures(data.features || []);
    };

    fetchFeatures();
  }, [project.project_id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{project.title}</h1>
      <p className={styles.description}>{project.description}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
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

      <h2 className={styles.featuresTitle}>Features</h2>
      <div className={styles.featuresList}>
        {features.map((feature: Feature) => (
          <FeatureDisplayCard key={feature.feature_id} feature={feature} />
        ))}
      </div>

      <FeatureCard projectId={project.project_id} />
    </div>
  );
};

export default ProjectPage;
