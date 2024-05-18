import React, { useState } from "react";

import styles from "./featureDisplayCard.module.css";
import TaskModal from "../modal";

const FeatureDisplayCard = ({ feature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.description}>{feature.description}</p>
      {feature.image_url && (
        <img
          src={feature.image_url}
          alt={feature.title}
          className={styles.image}
        />
      )}
      <button onClick={openModal} className={styles.createTaskButton}>
        Create Task
      </button>
      {isModalOpen && (
        <TaskModal featureId={feature.feature_id} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FeatureDisplayCard;
