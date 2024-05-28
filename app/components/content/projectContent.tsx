"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import styles from "./projectContent.module.scss";

import { Feature } from "@prisma/client";
import CreateComponent from "../cards/form/create";
import FeatureContent from "./featureContent";
import EditableContent from "./modules/editContent";

const ProjectContent = ({ project, onProjectUpdate }) => {
  const { data: session, status } = useSession();
  const [features, setFeatures] = useState([]);
  const [editedProject, setEditedProject] = useState({ ...project });

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

  const handleSaveProject = async (updatedProject) => {
    try {
      const response = await fetch(`/api/projects/${project.project_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        onProjectUpdate(updatedProject);
      } else {
        console.error("Error editing project:", await response.json());
      }
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const response = await fetch(`/api/projects/${project.project_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onProjectUpdate(null);
      } else {
        console.error("Error deleting project:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <EditableContent
        initialContent={project}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
      >
        {({ editedContent, handleInputChange }) => (
          <section className={styles.projectInfo}>
            {handleInputChange ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedContent.title}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <textarea
                  name="description"
                  value={editedContent.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
                <input
                  type="text"
                  name="link"
                  value={editedContent.link}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="image_url"
                  value={editedContent.image_url}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </>
            ) : (
              <>
                <h1 className={styles.title}>{editedContent.title}</h1>
                <p className={styles.description}>
                  {editedContent.description}
                </p>
                {editedContent.link && (
                  <a
                    href={editedContent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Project Link
                  </a>
                )}
                {editedContent.image_url && (
                  <img
                    src={editedContent.image_url}
                    alt={editedContent.title}
                    className={styles.image}
                  />
                )}
              </>
            )}
          </section>
        )}
      </EditableContent>
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.createCard}>
            <CreateComponent type="feature" parentId={project.project_id} />
          </div>
          {features.map((feature: Feature) => (
            <FeatureContent key={feature.feature_id} feature={feature} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectContent;
