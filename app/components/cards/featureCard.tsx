// components/FeatureCard.js
"use client";
import { useState } from "react";
import styles from "./featureCard.module.css";
import Modal from "./Modal";
import CreateTask from "./CreateTask"; // Import the CreateTask component

const FeatureCard = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Hard);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featureData = {
      title,
      description,
      size: taskSize,
      type: taskType,
      image_url: imageUrl,
      project_id: projectId,
    };

    const response = await fetch("/api/create/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setTaskType(TaskType.UIDesign);
      setTaskSize(TaskSize.Easy);
    } else {
      console.error("Failed to create feature");
    }
  };

  return (
    <div className={styles.featureCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Form Fields */}
        {/* Other Form Fields */}
        <button type="submit" className={styles.submitButton}>
          Create Feature
        </button>
      </form>

      {/* Button to Open Modal */}
      <button onClick={() => setShowModal(true)} className={styles.addButton}>
        Add Task
      </button>

      {/* Modal for Creating Task */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CreateTask featureId={featureId} />
      </Modal>
    </div>
  );
};

export default FeatureCard;
