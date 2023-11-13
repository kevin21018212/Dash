// Dashboard.js

"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import TodoForm from "./components/todoform";
import TodoList from "./components/todolist";
import styles from "./page.module.css";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos?email=${session?.data?.user.email}`,
    fetcher
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [todos, setTodos] = useState(data);

  const handleAddTodo = async (title) => {
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
        msg: `Added New Todo`,
        type: "success",
      });

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      mutate();
      setTodos((prevTodos) => [
        ...prevTodos,
        { title, complete: false, _id: Date.now(), isClicked: false },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
    return null;
  }

  return (
    <div className={styles.container}>
      {errorMessage && (
        <div className={styles.successMessage}>
          <strong>Success! </strong>
          <span>{errorMessage.msg}</span>
        </div>
      )}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Dashboard;
