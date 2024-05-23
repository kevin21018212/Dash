import React, { useState } from "react";
import styles from "./taskContent.module.css";

const TaskContent = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/edit/task?taskId=${task.task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdate(updatedTask);
        setIsEditing(false);
      } else {
        console.error("Error editing task:", await response.json());
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/delete/task?taskId=${task.task_id}`, {
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
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="size"
            value={editedTask.size}
            onChange={handleInputChange}
            className={styles.input}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className={styles.textarea}
          />
          <button onClick={handleSaveClick} className={styles.saveButton}>
            Save
          </button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.size}</p>
          <p>{task.description}</p>
          <button onClick={handleEditClick} className={styles.editButton}>
            Edit
          </button>
          <button onClick={handleDeleteClick} className={styles.deleteButton}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskContent;
