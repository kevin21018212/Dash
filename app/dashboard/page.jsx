"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import useSWR from "swr";
import { requestToBodyStream } from "next/dist/server/body-streams";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isClicked, setIsClicked] = useState({});

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos?email=${session?.data?.user.email}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTodo = async (e) => {
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
        msg: `Added New Todo`,
        type: "success",
      });

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      mutate();
    } catch (err) {
      console.error(err);
    }

    setTitle("");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setErrorMessage({
        msg: `Deleted Todo`,
        type: "success",
      });

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      mutate();
    } catch (err) {
      throw new Error("Error");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
      });
      mutate();
    } catch (err) {
      throw new Error("Error");
    }
  };

  const handleCollapsed = (id) => {
    setIsClicked((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const changeDate = (str) => {
    const date = new Date(str);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const newDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return newDate;
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col gap-6 max-w-[400px]">
        {errorMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <strong class="font-bold">Sucess! </strong>
            <span class="block sm:inline">{errorMessage.msg}</span>
          </div>
        )}
        <div className="flex justify-center">
          <Image
            src="/assets/images/profile.jpg"
            width={100}
            height={100}
            alt="avatar"
            className="rounded-full border-4 border-gray-400/40 w-[150px] h-[150px]"
          />
        </div>
        <div>
          <form onSubmit={handleTodo} className="flex gap-2 flex-col">
            <div className="flex relative items-center border border-transparent rounded-lg bg-white">
              <input
                type="text"
                placeholder="Add New Task"
                value={title}
                onChange={handleTitle}
                className="flex-grow px-2 py-1 min-h-[50px] outline-none rounded focus-within:border-slate-100"
              />
              <button type="submit">
                <div className="border border-transparent bg-[#7c6f5a]/80 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#7c6f5a"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between border-2 h-16 rounded-lg bg-[#7c6f5a] bg-opacity-90 text-white px-4">
          <div className="w-6 h-6 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#5A5A5A"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
          </div>

          <h1 className="text-left">Your Todos</h1>
          <div className="w-6 h-6 ml-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#5A5A5A"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col max-w-[600px] ">
          {isLoading ? (
            "Loading..."
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center bg-gray-300/70 p-4 gap-4 rounded-t-lg min-w-[350px] min-h-[250px] rounded">
              <div className="flex items-center border-1 border-transparent">
                <h1 className="">No Task Today</h1>
              </div>
            </div>
          ) : (
            data?.map((todo, index) => (
              <div key={todo._id} className="mb-0.5">
                <div
                  className={`flex items-center justify-between border border-[#A49377]/40 bg-gray-300 p-4 gap-4 min-w-[350px] ${
                    index === 0 ? "rounded-t-lg" : ""
                  }`}
                >
                  <div className="flex items-center border-1 border-transparent">
                    <div
                      className="w-6 h-6 mr-2 cursor-pointer"
                      onClick={() => handleUpdate(todo._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#A49377"
                        fill={todo.complete ? "#A49377" : "none"}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h1 className="text-lg text-gray-900">{todo.title}</h1>
                  </div>
                  <div
                    className="w-6 h-6 ml-2 cursor-pointer"
                    onClick={() => handleCollapsed(todo._id)}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      fill="#A49377"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.54 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM17.54 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92z"
                      />
                    </svg>
                  </div>
                </div>
                {isClicked[todo._id] === true && (
                  <div className="flex flex-col bg-gray-200 rounded-b-lg mt-0.5">
                    <div className="p-4">
                      <p>
                        <strong>Completed:</strong>{" "}
                        {todo.complete === true ? "Completed" : "Not Completed"}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {changeDate(todo?.createdAt)}
                      </p>
                      <button
                        className="border min-w-[325px] border-transparent bg-red-300 text-red-600 active:bg-red-400 rounded px-2 py-1 outline-none focus-within:border-slate-100"
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="bg-gray-300 rounded-b-lg min-w-[350px] min-h-[10px]"></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
