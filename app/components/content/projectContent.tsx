"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import FeatureDisplayCard from "../cards/featureDisplayCard";
import styles from "./projectPage.module.css";
import { Feature } from "@prisma/client";
import CreateFeature from "../cards/form/createFeature";

const ProjectContent = ({ project }) => {
  const { data: session, status } = useSession();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
        <CreateFeature projectId={project.project_id} />
        {features.map((feature: Feature) => (
          <FeatureDisplayCard key={feature.feature_id} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default ProjectContent;