"use client";
import React, { useState } from "react";
import styles from "./homepage.module.css";
import FeatureCard from "./components/cards/featureCard";
import ProjectCard from "./components/cards/projectCard";
import TaskCard from "./components/cards/taskCard";

const Page = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <ProjectCard />
        <TaskCard />
      </div>
    </div>
  );
};

export default Page;
