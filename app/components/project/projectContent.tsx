"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import styles from "./projectContent.module.scss";

import { Feature } from "@prisma/client";
import CreateComponent from "../global/form/create";
import FeatureContent from "../feature/featureContent";
import EditableContent from "../global/modules/editContent";
import EditForm from "../global/modules/editForm"; // Import the new EditForm component
import {
  handleSaveProject,
  handleDeleteProject,
} from "../global/modules/contentHandlers";

const ProjectContent = ({ project, onProjectUpdate }) => {
  const { data: session, status } = useSession();
  const [features, setFeatures] = useState(project.features || []);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const backgroundImageStyle = project.image_url
    ? { backgroundImage: `url(${project.image_url})`, backgroundSize: "cover" }
    : { backgroundColor: "#0070f3" };

  return (
    <div className={styles.container}>
      <EditableContent
        initialContent={project}
        onSave={(updatedProject) =>
          handleSaveProject(project, updatedProject, onProjectUpdate)
        }
        onDelete={() => handleDeleteProject(project, onProjectUpdate)}
        renderContent={({ editedContent }) => (
          <section className={styles.projectInfo}>
            <div className={styles.titleContent} style={backgroundImageStyle}>
              <h1 className={styles.title}>{editedContent.title}</h1>
            </div>
            <div className={styles.descriptionContent}>
              <p className={styles.description}>{editedContent.description}</p>
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
            </div>
          </section>
        )}
        EditFormComponent={({
          editedContent,
          handleInputChange,
          handleSaveClick,
          handleDeleteClick,
        }) => (
          <EditForm
            editedContent={editedContent}
            handleInputChange={handleInputChange}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      />
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.createCard}>
            <CreateComponent
              type="feature"
              parentId={project.project_id}
              onCancel={null}
            />
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
