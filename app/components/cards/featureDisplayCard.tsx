import React, { useState } from "react";
import styles from "./featureDisplayCard.module.css";
import { Task } from "@prisma/client";
import CreateTask from "./form/createTask";

const FeatureDisplayCard = ({ feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

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

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
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
        {feature.tasks.map((task) => (
          <div
            key={task.task_id}
            className={`${styles.task} ${
              selectedTask?.task_id === task.task_id ? styles.selectedTask : ""
            }`}
            onClick={() => handleTaskClick(task)}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
        ))}
        <button onClick={handleCreateTaskClick}>Create Task</button>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          {showCreateTask ? (
            <CreateTask featureId={feature.feature_id} />
          ) : (
            selectedTask && (
              <div className={styles.taskDetail}>
                <h4>{selectedTask.title}</h4>
                <p>{selectedTask.description}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureDisplayCard;
