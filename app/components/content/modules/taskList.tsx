import React from "react";
import { Task } from "@prisma/client";
import styles from "./taskList.module.scss";

const TaskList = ({ tasks, selectedTask, onTaskClick, onCreateTaskClick }) => (
  <div className={styles.tasks}>
    <div className={styles.gridContainer}>
      {tasks.map((task) => (
        <div
          key={task.task_id}
          className={`${styles.task} ${
            selectedTask?.task_id === task.task_id ? styles.selectedTask : ""
          }`}
          onClick={() => onTaskClick(task)}
        >
          <h4 className={styles.taskTitle}>{task.title}</h4>
          <p className={styles.taskSize}>{task.size}</p>
        </div>
      ))}
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.createTaskButton} onClick={onCreateTaskClick}>
        Create Task
      </button>
    </div>
  </div>
);

export default TaskList;
