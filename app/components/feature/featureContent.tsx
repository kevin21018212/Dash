import React, { useState, useEffect, useRef } from "react";
import styles from "./featureContent.module.scss";
import common from "../../common.module.scss";
import {
  handleSaveFeature,
  handleDeleteFeature,
  handleTaskUpdate,
} from "@/app/utils/contentHandlers";
import { EditableField } from "../global/form/edit";
import Modal from "../modal";
import TaskContent from "../task/taskContent";
import CreateComponent from "../form/create";
import { FiEdit } from "react-icons/fi";

const FeatureContent = ({ feature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeature, setEditedFeature] = useState(feature);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const featureRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field, value) => {
    setEditedFeature({ ...editedFeature, [field]: value });
  };

  const handleSave = () => {
    handleSaveFeature(feature, editedFeature);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteFeature(feature);
  };

  const handleCreateTaskClick = () => {
    setShowCreateTask(true);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (featureRef.current && !featureRef.current.contains(event.target)) {
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

  return (
    <>
      {isEditing ? (
        <div ref={featureRef} className={styles.card}>
          <div className={styles.featureInfo}>
            <EditableField
              value={editedFeature.title}
              onSave={(value) => handleFieldChange("title", value)}
            />
            <EditableField
              value={editedFeature.description}
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
        </div>
      ) : (
        <div ref={featureRef} className={styles.card}>
          <div className={styles.featureInfo}>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
          <div className={styles.clickableArea} onClick={handleCardClick}>
            <p>Click here to view tasks</p>
          </div>
          <FiEdit
            className={common.editIcon}
            onClick={() => setIsEditing(true)}
          />

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <div className={styles.taskGrid}>
                <div
                  className={styles.createTaskCard}
                  onClick={handleCreateTaskClick}
                >
                  + Create Task
                </div>
                {feature.tasks.map((task) => (
                  <TaskContent key={task.id} task={task} />
                ))}
              </div>
              {showCreateTask && (
                <CreateComponent
                  type="task"
                  parentId={feature.feature_id}
                  onCancel={handleCloseModal}
                />
              )}
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default FeatureContent;
