import React, { useState } from "react";
import { Task } from "@prisma/client";

import styles from "./featureContent.module.css";
import CreateComponent from "../cards/form/create";
import Sidebar from "../sidebar";
import TaskContent from "./taskContent";

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

  const handleTaskUpdate = (updatedTask) => {
    if (updatedTask) {
      const updatedTasks = feature.tasks.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
      feature.tasks = updatedTasks;
      setSelectedTask(updatedTask);
    } else {
      const updatedTasks = feature.tasks.filter(
        (task) => task.task_id !== selectedTask?.task_id
      );
      feature.tasks = updatedTasks;
      setSelectedTask(null);
      setIsExpanded(false);
    }
  };

  const handleDeleteFeature = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feature?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/delete/feature?featureId=${feature.feature_id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
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
          <button
            className={styles.deleteFeatureButton}
            onClick={handleDeleteFeature}
          >
            Delete Feature
          </button>
        </div>
      </div>
      {isExpanded && (
        <Sidebar isExpanded={isExpanded} onCollapse={handleCollapse}>
          {showCreateTask ? (
            <CreateComponent type="task" parentId={feature.feature_id} />
          ) : (
            selectedTask && (
              <TaskContent
                task={selectedTask}
                onTaskUpdate={handleTaskUpdate}
              />
            )
          )}
        </Sidebar>
      )}
    </div>
  );
};

export default FeatureContent;
