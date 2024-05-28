import React, { useState } from "react";
import styles from "./editContent.module.scss";

const EditableContent = ({ initialContent, onSave, onDelete, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({ ...initialContent });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContent({ ...editedContent, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await onSave(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedContent({ ...initialContent });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className={styles.editableContent}>
      {isEditing ? (
        <>
          {children({ editedContent, handleInputChange, isEditing })}
          <button onClick={handleSaveClick} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleCancelClick} className={styles.cancelButton}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {children({ editedContent, isEditing })}
          <div>
            <button onClick={handleEditClick} className={styles.editButton}>
              Edit
            </button>
            <button onClick={handleDeleteClick} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableContent;
