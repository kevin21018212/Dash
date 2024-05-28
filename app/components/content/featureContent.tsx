import React, { useState } from "react";
import { Task } from "@prisma/client";
import styles from "./featureContent.module.scss";
import CreateComponent from "../cards/form/create";
import Sidebar from "../sidebar";
import TaskContent from "./taskContent";
import EditableContent from "./modules/editContent";
import TaskList from "./modules/taskList";
import {
  handleSaveFeature,
  handleDeleteFeature,
  handleTaskUpdate,
} from "./modules/contentHandlers";

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
        <EditableContent
          initialContent={feature}
          onSave={(editedFeature) => handleSaveFeature(feature, editedFeature)}
          onDelete={() => handleDeleteFeature(feature)}
        >
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
                onTaskUpdate={(updatedTask) =>
                  handleTaskUpdate(
                    feature,
                    selectedTask,
                    updatedTask,
                    setSelectedTask,
                    setIsExpanded
                  )
                }
              />
            )
          )}
        </Sidebar>
      )}
    </div>
  );
};

export default FeatureContent;
