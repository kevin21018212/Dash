import React, { useState, useEffect, useRef } from "react";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import styles from "./featureContent.module.scss";
import common from "@/app/common.module.scss";
import { EditableField } from "../global/form/edit";
import TaskContent from "../task/taskContent";
import { FiEdit } from "react-icons/fi";
import CreateComponent from "../global/form/create";
import { motion } from "framer-motion";
import Modal from "../global/function/modal";
import { Feature } from "@/app/types";

interface FeatureContentProps {
  feature: Feature;
}

const FeatureContent: React.FC<FeatureContentProps> = ({ feature }) => {
  const { handleFieldChange, saveFeature, deleteFeature } =
    useContentHandlers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeature, setEditedFeature] = useState<Feature>(feature);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const featureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        featureRef.current &&
        !featureRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

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
                onSave={(value) =>
                  handleFieldChange(
                    "title",
                    value,
                    editedFeature,
                    setEditedFeature
                  )
                }
              />
            </div>
            <div className={styles.descriptionContainer}>
              <EditableField
                value={editedFeature.description}
                onSave={(value) =>
                  handleFieldChange(
                    "description",
                    value,
                    editedFeature,
                    setEditedFeature
                  )
                }
                type="textArea"
              />
            </div>
          </div>
          <div className={common.actionButtons}>
            <button
              onClick={() => saveFeature(feature, editedFeature, setIsEditing)}
              className={common.saveButton}
            >
              Save
            </button>
            <button
              onClick={() => deleteFeature(feature)}
              className={common.deleteButton}
            >
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
            onClick={() => setIsModalOpen(true)}
          >
            <p>Click here to view tasks</p>
          </motion.div>
          <FiEdit
            className={common.editIcon}
            onClick={() => setIsEditing(true)}
          />

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className={styles.taskGrid}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={styles.createTaskCard}
                  onClick={() => setShowCreateTask(true)}
                >
                  + Create Task
                </motion.div>
                {feature.tasks.map((task, index) => (
                  <TaskContent task={task} key={index} />
                ))}
              </div>
              {showCreateTask && (
                <CreateComponent
                  type="task"
                  parentId={feature.feature_id}
                  onCancel={() => setIsModalOpen(false)}
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
