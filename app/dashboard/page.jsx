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
      <TodoForm session={session} mutate={mutate} />
      <TodoList todos={data} setTodos={setTodos} />
    </div>
  );
};

export default Dashboard;
