import React, { useState, useEffect, useRef } from "react";
import styles from "./editContent.module.scss";
import { FaPencilAlt } from "react-icons/fa";

const EditableContent = ({
  initialContent,
  onSave,
  onDelete,
  renderContent,
  EditFormComponent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({ ...initialContent });
  const ref = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleCancelClick();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div
      className={`${styles.editableContent} ${isEditing ? styles.editing : ""}`}
      ref={ref}
    >
      {!isEditing && (
        <FaPencilAlt className={styles.editIcon} onClick={handleEditClick} />
      )}
      {isEditing ? (
        <EditFormComponent
          editedContent={editedContent}
          handleInputChange={handleInputChange}
          handleSaveClick={handleSaveClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        renderContent({ editedContent })
      )}
    </div>
  );
};

export default EditableContent;
