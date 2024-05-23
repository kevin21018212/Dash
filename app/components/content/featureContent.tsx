// components/FeatureContent.tsx
import React, { useState } from "react";
import styles from "./featureContent.module.css";
import { Task } from "@prisma/client";

import Sidebar from "../sidebar";
import CreateComponent from "../cards/form/create";

const FeatureContent = ({ feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowCreateTask(false);
    setIsExpanded(true);
  };

  const handleCreateTaskClick = () => {
    setSelectedTask(null);
    setShowCreateTask(true);
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSelectedTask(null);
    setShowCreateTask(false);
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expandedCard : ""}`}>
      <div className={styles.content}>
        <div className={styles.featureInfo}>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
          {feature.image_url && (
            <img
              src={feature.image_url}
              alt={feature.title}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.tasks}>
          <div className={styles.gridContainer}>
            {feature.tasks.map((task) => (
              <div
                key={task.task_id}
                className={`${styles.task} ${
                  selectedTask?.task_id === task.task_id
                    ? styles.selectedTask
                    : ""
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <h4 className={styles.taskTitle}>{task.title}</h4>
                <p className={styles.taskSize}>{task.size}</p>
              </div>
            ))}
          </div>
          <button
            className={styles.createTaskButton}
            onClick={handleCreateTaskClick}
          >
            Create Task
          </button>
        </div>
      </div>
      {isExpanded && (
        <Sidebar isExpanded={isExpanded} onCollapse={handleCollapse}>
          {showCreateTask ? (
            <CreateComponent type="task" parentId={feature.feature_id} />
          ) : (
            selectedTask && (
              <div className={styles.taskDetail}>
                <h4>{selectedTask.title}</h4>
                <p>{selectedTask.size}</p>
                <p>{selectedTask.description}</p>
              </div>
            )
          )}
        </Sidebar>
      )}
    </div>
  );
};

export default FeatureContent;
