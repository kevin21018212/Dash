import React, { useState, useRef } from "react";
import styles from "./featureContent.module.scss";
import { Feature } from "@/app/types";
import { FiEdit } from "react-icons/fi";
import EditFeature from "./editFeature";

interface FeatureContentProps {
  feature: Feature;
}

const FeatureContent: React.FC<FeatureContentProps> = ({ feature }) => {
  const [isEditing, setIsEditing] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

  if (isEditing) {
    return <EditFeature feature={feature} setEditing={setIsEditing} />;
  }

  return (
    <div ref={featureRef} className={styles.card}>
      <div className={styles.featureInfo}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{feature.title}</h3>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{feature.description}</p>
        </div>
      </div>
      <FiEdit className={styles.editIcon} onClick={() => setIsEditing(true)} />
    </div>
  );
};

export default FeatureContent;
