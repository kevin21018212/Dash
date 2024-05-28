import React, { useState } from "react";
import { Task } from "@prisma/client";
import styles from "./featureContent.module.scss";
import CreateComponent from "../cards/form/create";
import Sidebar from "../sidebar";
import TaskContent from "./taskContent";
import EditableContent from "./modules/editContent";
import TaskList from "./modules/taskList";

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

  const handleSaveFeature = async (editedFeature) => {
    try {
      const response = await fetch(`/api/features/${feature.feature_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFeature),
      });

      if (!response.ok) {
        console.error("Error editing feature:", await response.json());
      }
    } catch (error) {
      console.error("Error editing feature:", error);
    }
  };

  const handleDeleteFeature = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feature?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/features/${feature.feature_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Handle feature deletion logic here
      } else {
        console.error("Error deleting feature:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expandedCard : ""}`}>
      <div className={styles.content}>
        <EditableContent initialContent={feature} onSave={handleSaveFeature}>
          {({ editedContent, handleInputChange }) => (
            <div className={styles.featureInfo}>
              {handleInputChange ? (
                <div className={styles.editContainer}>
                  <input
                    type="text"
                    name="title"
                    value={editedContent.title}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <textarea
                    name="description"
                    value={editedContent.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                  />
                  <input
                    type="text"
                    name="image_url"
                    value={editedContent.image_url}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              ) : (
                <>
                  <h3 className={styles.title}>{editedContent.title}</h3>
                  <p className={styles.description}>
                    {editedContent.description}
                  </p>
                  {editedContent.image_url && (
                    <img
                      src={editedContent.image_url}
                      alt={editedContent.title}
                      className={styles.image}
                    />
                  )}
                  <button
                    onClick={handleDeleteFeature}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </EditableContent>
        <TaskList
          tasks={feature.tasks}
          selectedTask={selectedTask}
          onTaskClick={handleTaskClick}
          onCreateTaskClick={handleCreateTaskClick}
        />
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
