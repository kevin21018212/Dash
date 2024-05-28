// components/InputField.js
import React from "react";
import styles from "./inputField.module.css";

const InputField = ({ type, name, value, onChange }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className={styles.input}
  />
);

// components/DropdownField.js
import React from "react";
import styles from "./dropdownField.module.css";

const DropdownField = ({ name, value, onChange, options }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={styles.dropdown}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default DropdownField;

export default InputField;
