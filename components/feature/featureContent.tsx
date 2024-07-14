import React, { useState, useRef } from "react";
import styles from "./featureContent.module.scss";
import { Feature } from "@/app/types";
import { FiEdit } from "react-icons/fi";
import EditFeature from "./editFeature";
import { motion } from "framer-motion";
import Modal from "../global/function/modal";
import TaskContent from "../task/taskContent";
import CreateTask from "../global/form/create";

interface FeatureContentProps {
  feature: Feature;
}

const FeatureContent: React.FC<FeatureContentProps> = ({ feature }) => {
  const [isEditing, setIsEditing] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  if (isEditing) {
    return <EditFeature feature={feature} setEditing={setIsEditing} />;
  }

  return (
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
      <FiEdit className={styles.editIcon} onClick={() => setIsEditing(true)} />

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
            <CreateTask
              parentId={feature.feature_id}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default FeatureContent;
