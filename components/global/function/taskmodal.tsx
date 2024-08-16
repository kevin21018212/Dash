import React, { useEffect, useRef } from "react";
import styles from "./modal.module.scss";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isCreate: boolean;
}

const TaskModal = ({ isOpen, onClose, children, isCreate = false }: TaskModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (isCreate)
    return (
      <div className={styles.clearOverlay}>
        <div className={styles.taskModal} ref={modalRef} onClick={(e) => e.stopPropagation()}></div>
      </div>
    );

  return (
    <div className={styles.clearOverlay}>
      <div className={styles.taskModal} ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;
