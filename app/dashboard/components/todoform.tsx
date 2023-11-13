import React, { useState } from "react";
import styles from "../page.module.css";

interface TodoFormProps {
  session: any;
  mutate: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ session, mutate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  const [errorMessage, setErrorMessage] = useState<{
    msg: string;
    type: string;
  } | null>(null);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email,
          title,
          description,
          complete: false,
        }),
      });

      setErrorMessage({
        msg: "Added New Todo",
        type: "success",
      });

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      mutate();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
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
          <input
            type="text"
            placeholder="Add Description"
            value={description}
            onChange={handleDescription}
          />
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
