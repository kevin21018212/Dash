import React, { useState } from "react";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import styles from "./taskContent.module.scss";
import common from "@/app/common.module.scss";
import { TaskStatus } from "@/app/utils/enums";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { Task } from "@/app/types";
import EditTask from "./editTask";

interface TaskContentProps {
  task: Task;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateTaskStatus } = useContentHandlers();

  const handleStatusClick = () => {
    updateTaskStatus(task, TaskStatus.DONE);
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} className={styles.taskDetail}>
        <div
          className={`${styles.statusCircle} ${task.status === TaskStatus.DONE ? styles.statusCircleDone : ""}`}
          onClick={handleStatusClick}
        ></div>
        <div className={styles.topSection}>
          <p>{task.title}</p>
          <div className={styles.buttons}>
            <div className={`${styles.taskType} ${styles[task.type]}`}>{task.type}</div>
            <div className={`${styles.taskSize} ${styles[task.size]}`}>{task.size}</div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.description}>{task.description}</div>
        </div>
        <FiEdit className={common.editIcon} onClick={() => setIsEditModalOpen(true)} />
      </motion.div>

      {isEditModalOpen && <EditTask task={task} onClose={() => setIsEditModalOpen(false)} />}
    </>
  );
};

export default TaskContent;
