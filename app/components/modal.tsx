import React, { useState } from "react";

import styles from "./modal.module.css";
import CreateTask from "./cards/form/createTask";

const TaskModal = ({ featureId, closeModal }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          &times;
        </button>
        <CreateTask featureId={featureId} />
      </div>
    </div>
  );
};

export default TaskModal;
