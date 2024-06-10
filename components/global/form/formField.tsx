import React from "react";
import styles from "./form.module.scss";

const FormField = ({ label, type, value, onChange, options, required }) => {
  return (
    <div className={styles.formFieldGroup}>
      <label className={styles.label}>
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      {type === "select" ? (
        <select
          className={styles.formFieldSelect}
          value={value}
          onChange={onChange}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className={styles.formFieldTextarea}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          className={styles.formFieldInput}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
