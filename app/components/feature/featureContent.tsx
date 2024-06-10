"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./featureContent.module.scss";
import common from "../../common.module.scss";
import { useSaveContent, useDeleteContent } from "@/app/utils/contentHandlers"; // Import the hooks
import { EditableField } from "../global/form/edit";
import TaskContent from "../task/taskContent";
import { FiEdit } from "react-icons/fi";
import CreateComponent from "../global/form/create";
import { motion } from "framer-motion";
import Modal from "../global/function/modal";

const FeatureContent = ({ feature, refetchProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeature, setEditedFeature] = useState(feature);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const featureRef = useRef<HTMLInputElement>(null);

  const saveFeature = useSaveContent(
    `/api/feature?featureId=${feature.feature_id}`
  );
  const deleteFeature = useDeleteContent(
    `/api/feature?featureId=${feature.feature_id}`
  );

  const handleFieldChange = (field, value) => {
    setEditedFeature({ ...editedFeature, [field]: value });
  };

  const handleSave = () => {
    saveFeature.mutate(editedFeature, { onSuccess: refetchProject });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteFeature.mutate(undefined, { onSuccess: refetchProject });
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
            <div className={styles.titleContainer}>
              <EditableField
                value={editedFeature.title}
                onSave={(value) => handleFieldChange("title", value)}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <EditableField
                value={editedFeature.description}
                onSave={(value) => handleFieldChange("description", value)}
                type="textArea"
              />
            </div>
          </div>
          <div className={common.actionButtons}>
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
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>{feature.title}</h3>
            </div>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{feature.description}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.clickableArea}
            onClick={handleCardClick}
          >
            <p>Click here to view tasks</p>
          </motion.div>
          <FiEdit
            className={common.editIcon}
            onClick={() => setIsEditing(true)}
          />

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <div className={styles.taskGrid}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={styles.createTaskCard}
                  onClick={handleCreateTaskClick}
                >
                  + Create Task
                </motion.div>
                {feature.tasks.map((task, index) => (
                  <TaskContent
                    task={task}
                    refetchProject={refetchProject}
                    key={index}
                  />
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
