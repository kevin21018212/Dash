import React, { useState } from "react";
import styles from "./edit.module.scss";

export const EditableDropdown = ({ value, options, onSave, optionstwo }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = (newValue) => {
    setCurrentValue(newValue);
    onSave(newValue);
  };

  return (
    <div className={styles.editableDropdown}>
      <select value={currentValue} onChange={(e) => handleSave(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select value={currentValue} onChange={(e) => handleSave(e.target.value)}>
        {optionstwo.map((optiontwo) => (
          <option key={optiontwo} value={optiontwo}>
            {optiontwo}
          </option>
        ))}
      </select>
    </div>
  );
};

export const EditableField = ({ value, onSave, type = "input" }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = (newValue) => {
    setCurrentValue(newValue);
    onSave(newValue);
  };

  if (type === "input") {
    return (
      <div className={styles.editableFieldInput}>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => handleSave(e.target.value)}
        />
      </div>
    );
  }
  return (
    <div className={styles.editableFieldTextArea}>
      <textarea
        value={currentValue}
        onChange={(e) => handleSave(e.target.value)}
      />
    </div>
  );
};

export default EditableField;
