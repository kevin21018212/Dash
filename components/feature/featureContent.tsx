import React, { useState, useRef } from "react";
import styles from "./featureContent.module.scss";
import { Feature } from "@/app/types";
import { FiEdit } from "react-icons/fi";
import EditFeature from "./editFeature";
import { motion } from "framer-motion";
import Modal from "../global/function/modal";
import TaskContent from "../task/taskContent";
import CreateTask from "../global/form/create";
import { useAtom } from "jotai/react";
import { modalAtom } from "@/app/utils/modalAtom";

interface FeatureContentProps {
  feature: Feature;
}

const FeatureContent: React.FC<FeatureContentProps> = ({ feature }) => {
  const [isEditing, setIsEditing] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useAtom(modalAtom);

  const [showCreateTask, setShowCreateTask] = useState(false);
  if (isEditing) {
    return <EditFeature feature={feature} setEditing={setIsEditing} />;
  }

  const isModalOpen = openModal != null;

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
      <motion.div whileHover={{ scale: 1.05 }} className={styles.clickableArea} onClick={() => setOpenModal(feature)}>
        <p>Click here to view tasks</p>
      </motion.div>
      <FiEdit className={styles.editIcon} onClick={() => setIsEditing(true)} />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setOpenModal(null)}>
          <div className={styles.taskGrid}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={styles.createTaskCard}
              onClick={() => setShowCreateTask(true)}
            >
              + Create Task
            </motion.div>
            {openModal.tasks.map((task, index) => (
              <TaskContent task={task} key={index} />
            ))}
          </div>

          {showCreateTask && (
            <div className={styles.createCard}>
              <CreateTask parentId={openModal.feature_id} onCancel={() => setOpenModal(null)} />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default FeatureContent;
