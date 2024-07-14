"use client";
import React, { useState } from "react";
import { Project } from "@/app/types";
import { EditableField } from "../global/form/edit";
import common from "@/app/common.module.scss";
import styles from "./projectContent.module.scss";
import { useContentHandlers } from "@/app/utils/contentHandlers";

interface EditProjectProps {
  project: Project;

  backgroundImageStyle: React.CSSProperties;
}

const EditProject: React.FC<EditProjectProps> = ({
  project,
  backgroundImageStyle,
}) => {
  const { handleFieldChange, saveProject, deleteProject } =
    useContentHandlers();
  const [editedProject, setEditedProject] = useState<Project>(project);
  return (
    <div className={common.pageContainer}>
      <section className={styles.projectInfo}>
        <div className={styles.infoLeft} style={backgroundImageStyle}>
          <EditableField
            value={editedProject.title}
            onSave={(value) =>
              handleFieldChange("title", value, editedProject, setEditedProject)
            }
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
            onSave={(value) =>
              handleFieldChange(
                "description",
                value,
                editedProject,
                setEditedProject
              )
            }
            type="textArea"
          />
        </div>
        <div className={common.actionButtons}>
          <button
            onClick={() =>
              saveProject(project, editedProject, setEditedProject)
            }
            className={common.saveButton}
          >
            Save
          </button>
          <button
            onClick={() => deleteProject(project)}
            className={common.deleteButton}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditProject;
