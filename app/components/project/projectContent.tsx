"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./projectContent.module.scss";
import common from "../../common.module.scss";
import {
  handleSaveProject,
  handleDeleteProject,
} from "@/app/utils/contentHandlers";
import FeatureContent from "../feature/featureContent";

import { EditableField } from "../global/form/edit";
import CreateComponent from "../form/create";

const ProjectContent = ({ project, onProjectUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [features, setFeatures] = useState(project.features || []);
  const projectInfoRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field, value) => {
    setEditedProject({ ...editedProject, [field]: value });
  };

  const handleSave = () => {
    handleSaveProject(project, editedProject, onProjectUpdate);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteProject(project, onProjectUpdate);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  const handleClickOutside = (event) => {
    if (
      projectInfoRef.current &&
      !projectInfoRef.current.contains(event.target)
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const backgroundImageStyle = project.image_url
    ? { backgroundImage: `url(${project.image_url})`, backgroundSize: "cover" }
    : { backgroundColor: "#0070f3" };

  return (
    <>
      {isEditing ? (
        <div className={styles.container}>
          <section ref={projectInfoRef} className={styles.projectInfo}>
            <div className={styles.infoLeft} style={backgroundImageStyle}>
              <EditableField
                value={editedProject.title}
                onSave={(value) => handleFieldChange("title", value)}
              />
            </div>
            <div className={styles.infoRight}>
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
              <EditableField
                value={editedProject.description}
                onSave={(value) => handleFieldChange("description", value)}
                type="textArea"
              />
            </div>
            <div className={styles.actionButtons}>
              <button onClick={handleSave} className={common.saveButton}>
                Save
              </button>
              <button onClick={handleDelete} className={common.deleteButton}>
                Delete
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className={styles.container}>
          <section className={styles.projectInfo}>
            <div className={styles.infoLeft} style={backgroundImageStyle}>
              <h1 className={styles.title}>{project.title}</h1>
            </div>
            <div className={styles.infoRight}>
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
              <p className={styles.description}>{project.description}</p>
              <div
                className={styles.editIcon}
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </div>
            </div>
          </section>
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
              {features.map((feature) => (
                <FeatureContent
                  key={feature.feature_id}
                  feature={feature}
                  onFeatureUpdate={onProjectUpdate}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectContent;
