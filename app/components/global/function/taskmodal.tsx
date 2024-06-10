import React from "react";
import styles from "./modal.module.scss";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const TaskModal = ({ isOpen, onClose, children }: TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.taskModal}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className={styles.closeButton} onClick={onClose}>
        ✖
      </button>
      {children}
    </div>
  );
};

export default TaskModal;
