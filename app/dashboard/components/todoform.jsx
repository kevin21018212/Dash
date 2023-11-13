"use client";
import React, { useState } from "react";
import styles from "../page.module.css";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTodo = (e) => {
    e.preventDefault();
    onAddTodo(title);
    setTitle("");
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleTodo}>
        <div>
          <input
            type="text"
            placeholder="Add New Task"
            value={title}
            onChange={handleTitle}
          />
          <button type="submit">Add Todo</button>{" "}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
