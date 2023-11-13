import React, { useState } from "react";
import styles from "../page.module.css";

interface TodoFormProps {
  session: any;
  mutate: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ session, mutate }) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<{
    msg: string;
    type: string;
  } | null>(null);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email,
          title,
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
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
