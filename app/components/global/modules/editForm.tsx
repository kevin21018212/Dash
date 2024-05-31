import React from "react";
import styles from "./editContent.module.scss";

const EditForm = ({
  editedContent,
  handleInputChange,
  handleSaveClick,
  handleDeleteClick,
}) => (
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
    <div className={styles.buttons}>
      <button onClick={handleSaveClick} className={styles.saveButton}>
        Save
      </button>
      <button onClick={handleDeleteClick} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  </div>
);

export default EditForm;
