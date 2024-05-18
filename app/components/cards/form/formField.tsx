import React from "react";
import styles from "./formField.module.css";

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  options?: string[];
  required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={label}>{label}</label>
      {type === "select" ? (
        <select
          id={label}
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
          id={label}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
