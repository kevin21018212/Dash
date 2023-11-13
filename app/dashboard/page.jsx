"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import TodoForm from "./components/todoform";
import TodoList from "./components/todolist";
import styles from "./page.module.css";

const Dashboard = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: todosData,
    mutate,
    error,
    isLoading,
  } = useSWR("/api/todos", fetcher);

  const session = useSession();
  const router = useRouter();

  if (error) return <div>Failed to load</div>;
  if (isLoading || !todosData) return <div>Loading...</div>;

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/");
    return null;
  }

  return (
    <div className={styles.container}>
      <TodoForm session={session} mutate={mutate} />
      <TodoList todos={todosData} mutate={mutate} />
    </div>
  );
};

export default Dashboard;
