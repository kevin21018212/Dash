"use client";
import React, { useState, useRef, useEffect } from "react";
import { Feature } from "@/app/types";
import { EditableField } from "../global/form/edit";
import styles from "./featureContent.module.scss";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import useClickOutside from "@/app/utils/contentFunctions";

interface EditFeatureProps {
  feature: Feature;
  setEditing: (editing: boolean) => void;
}

const EditFeature: React.FC<EditFeatureProps> = ({ feature, setEditing }) => {
  const { handleFieldChange, saveFeature, deleteFeature } = useContentHandlers();
  const [editedFeature, setEditedFeature] = useState<Feature>(feature);
  const featureRef = useRef<HTMLDivElement>(null);
  useClickOutside(featureRef, () => setEditing(false));

  return (
    <div ref={featureRef} className={styles.card}>
      <div className={styles.featureInfo}>
        <EditableField
          value={editedFeature.title}
          onSave={(value) => handleFieldChange("title", value, editedFeature, setEditedFeature)}
        />
        <EditableField
          value={editedFeature.description}
          onSave={(value) => handleFieldChange("description", value, editedFeature, setEditedFeature)}
          type="textArea"
        />
      </div>
      <div className={styles.actionButtons}>
        <button
          onClick={() => {
            saveFeature(feature, editedFeature, setEditing);
            setEditing(false);
          }}
          className={styles.saveButton}
        >
          Save
        </button>
        <button
          onClick={() => {
            deleteFeature(feature);
            setEditing(false);
          }}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditFeature;
