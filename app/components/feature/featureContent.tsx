import React, { useState } from "react";
import styles from "./featureContent.module.scss";
import CreateComponent from "../global/form/create";
import Modal from "../modal";
import EditableContent from "../global/modules/editContent";
import EditForm from "../global/modules/editForm"; // Import the new EditForm component
import TaskContent from "../task/taskContent";
import {
  handleSaveFeature,
  handleDeleteFeature,
  handleTaskUpdate,
} from "../global/modules/contentHandlers";

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
          renderContent={({ editedContent }) => (
            <div className={styles.featureInfo}>
              <h3 className={styles.title}>{editedContent.title}</h3>
              <p className={styles.description}>{editedContent.description}</p>
              {editedContent.image_url && (
                <img
                  src={editedContent.image_url}
                  alt={editedContent.title}
                  className={styles.image}
                />
              )}
              <div className={styles.clickableArea} onClick={handleCardClick}>
                <p>Click here to view tasks</p>
              </div>
            </div>
          )}
          EditFormComponent={EditForm} // Pass the EditForm component as a prop
        />
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
