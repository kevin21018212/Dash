import React, { useState } from "react";
import styles from "./editContent.module.scss";

const EditableContent = ({ initialContent, onSave, children }) => {
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

  return (
    <div className={styles.editableContent}>
      {isEditing ? (
        <>
          {children({ editedContent, handleInputChange })}
          <button onClick={handleSaveClick} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleCancelClick} className={styles.cancelButton}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {children({ editedContent })}
          <button onClick={handleEditClick} className={styles.editButton}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EditableContent;
