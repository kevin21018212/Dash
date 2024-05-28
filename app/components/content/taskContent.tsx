import React from "react";
import styles from "./taskContent.module.scss";
import EditableContent from "./modules/editContent";

const TaskContent = ({ task, onTaskUpdate }) => {
  const handleSaveTask = async (updatedTask) => {
    const response = await fetch(`/api/tasks/${task.task_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      onTaskUpdate(updatedTask);
    } else {
      console.error("Error editing task:", await response.json());
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.task_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onTaskUpdate(null);
      } else {
        console.error("Error deleting task:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.taskDetail}>
      <EditableContent
        initialContent={task}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      >
        {({ editedContent, handleInputChange }) => (
          <>
            <input
              type="text"
              name="title"
              value={editedContent.title}
              onChange={handleInputChange}
              className={styles.input}
            />
            <select
              name="size"
              value={editedContent.size}
              onChange={handleInputChange}
              className={styles.dropdown}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <select
              name="content"
              value={editedContent.content}
              onChange={handleInputChange}
              className={styles.dropdown}
            >
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
            </select>
            <textarea
              name="description"
              value={editedContent.description}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </>
        )}
      </EditableContent>
    </div>
  );
};

export default TaskContent;
