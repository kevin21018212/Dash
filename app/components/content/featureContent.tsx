import React, { useState } from "react";
import { Task } from "@prisma/client";
import styles from "./featureContent.module.scss";
import CreateComponent from "../cards/form/create";
import Modal from "../modal";
import EditableContent from "./modules/editContent";
import TaskContent from "./taskContent";
import {
  handleSaveFeature,
  handleDeleteFeature,
  handleTaskUpdate,
} from "./modules/contentHandlers";

const FeatureContent = ({ feature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
    setShowCreateTask(false);
  };

  const handleCreateTaskClick = () => {
    setShowCreateTask(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowCreateTask(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <EditableContent
          initialContent={feature}
          onSave={(editedFeature) => handleSaveFeature(feature, editedFeature)}
          onDelete={() => handleDeleteFeature(feature)}
        >
          {({ editedContent, handleInputChange, isEditing }) => (
            <div className={styles.featureInfo}>
              {isEditing ? (
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
                  <div
                    className={styles.clickableArea}
                    onClick={handleCardClick}
                  >
                    <p>Click here to view tasks</p>
                  </div>
                </>
              )}
            </div>
          )}
        </EditableContent>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={styles.taskGrid}>
            <div
              className={styles.createTaskCard}
              onClick={handleCreateTaskClick}
            >
              + Create Task
            </div>
            {feature.tasks.map((task) => (
              <TaskContent
                key={task.id}
                task={task}
                onTaskUpdate={(updatedTask) =>
                  handleTaskUpdate(
                    feature,
                    task,
                    updatedTask,
                    () => {},
                    () => {}
                  )
                }
              />
            ))}
          </div>
          {showCreateTask && (
            <CreateComponent
              type="task"
              parentId={feature.feature_id}
              onCancel={handleCloseModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default FeatureContent;
