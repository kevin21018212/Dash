import React from "react";
import { Task } from "@prisma/client";
import styles from "./taskCard.module.scss";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <div className={styles.taskCard} onClick={onClick}>
      <h4 className={styles.taskTitle}>{task.title}</h4>
      <p className={styles.taskDescription}>{task.description}</p>
    </div>
  );
};

export default TaskCard;
