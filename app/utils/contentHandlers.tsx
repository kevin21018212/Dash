import { useAtom } from "jotai";
import { projectAtom } from "@/app/utils/projectAtom";
import {
  Project,
  Feature,
  Task,
  dbTask,
  dbFeature,
  dbProject,
} from "@/app/types";
import { TaskStatus } from "./enums";

export const handleRequest = async (
  url: string,
  method: string,
  body?: any
) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};

export const useContentHandlers = () => {
  const [project, setProject] = useAtom(projectAtom);

  const handleSave = async (
    url: string,
    data: any,
    updateStateCallback: (prev: Project) => Project,
    afterSaveCallback?: () => void
  ) => {
    try {
      await handleRequest(url, "PUT", data);
      setProject(updateStateCallback);
      afterSaveCallback?.();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (
    url: string,
    updateStateCallback: (prev: Project) => Project,
    afterDeleteCallback?: () => void
  ) => {
    try {
      await handleRequest(url, "DELETE");
      setProject(updateStateCallback);
      afterDeleteCallback?.();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCreate = async (
    url: string,
    data: any,
    updateStateCallback: (prev: Project, createdData: any) => Project,
    afterCreateCallback?: () => void
  ) => {
    try {
      const createdData = await handleRequest(url, "POST", data);
      setProject((prev) => updateStateCallback(prev, createdData));
      afterCreateCallback?.();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleFieldChange = <T,>(
    field: keyof T,
    value: any,
    state: T,
    setState: (data: T) => void
  ) => {
    setState({ ...state, [field]: value });
  };

  const saveFeature = (
    feature: Feature,
    editedFeature: Feature,
    setIsEditing: (value: boolean) => void
  ) => {
    handleSave(
      `/api/feature?featureId=${feature.feature_id}`,
      editedFeature,
      (prev) => ({
        ...prev,
        features: prev.features.map((f) =>
          f.feature_id === editedFeature.feature_id ? editedFeature : f
        ),
      }),
      () => setIsEditing(false)
    );
  };

  const deleteFeature = (feature: Feature) => {
    handleDelete(`/api/feature?featureId=${feature.feature_id}`, (prev) => ({
      ...prev,
      features: prev.features.filter(
        (f) => f.feature_id !== feature.feature_id
      ),
    }));
  };

  const saveTask = (task: Task, editedTask: Task) => {
    handleSave(`/api/task?taskId=${task.task_id}`, editedTask, (prev) => ({
      ...prev,
      features: prev.features.map((feature) =>
        feature.feature_id === task.feature_id
          ? {
              ...feature,
              tasks: feature.tasks.map((t) =>
                t.task_id === editedTask.task_id ? editedTask : t
              ),
            }
          : feature
      ),
    }));
  };

  const deleteTask = (task: Task) => {
    handleDelete(`/api/task?taskId=${task.task_id}`, (prev) => ({
      ...prev,
      features: prev.features.map((feature) =>
        feature.feature_id === task.feature_id
          ? {
              ...feature,
              tasks: feature.tasks.filter((t) => t.task_id !== task.task_id),
            }
          : feature
      ),
    }));
  };

  const saveProject = (
    project: Project,
    editedProject: Project,
    setIsEditing: any
  ) => {
    handleSave(
      `/api/project?projectId=${project.project_id}`,
      editedProject,
      () => editedProject,
      () => setIsEditing(false)
    );
  };

  const deleteProject = (project: Project) => {
    handleDelete(`/api/project?projectId=${project.project_id}`, () => ({
      project_id: 0,
      title: "",
      description: "",
      image_url: "",
      link: null,
      user_id: 0,
      features: [],
    }));
  };

  const createProject = (data: dbProject, afterCreateCallback?: () => void) => {
    handleCreate(
      `/api/project`,
      data,
      (prev, createdData) => ({
        ...prev,
        ...createdData,
      }),
      afterCreateCallback
    );
  };

  const createFeature = (
    data: dbFeature,
    projectId: number,
    afterCreateCallback?: () => void
  ) => {
    handleCreate(
      `/api/feature`,
      data,
      (prev, createdData) => ({
        ...prev,
        features: [...prev.features, createdData],
      }),
      afterCreateCallback
    );
  };

  const createTask = (
    data: dbTask,
    featureId: number,
    afterCreateCallback?: () => void
  ) => {
    handleCreate(
      `/api/task`,
      data,
      (prev, createdData) => ({
        ...prev,
        features: prev.features.map((feature) =>
          feature.feature_id === featureId
            ? { ...feature, tasks: [...feature.tasks, createdData] }
            : feature
        ),
      }),
      afterCreateCallback
    );
  };

  const updateTaskStatus = (task: Task, status: TaskStatus) => {
    const updatedTask = { ...task, status };
    saveTask(
      task,
      updatedTask,
      () => {},
      () => {}
    );
  };

  return {
    handleSave,
    handleDelete,
    handleFieldChange,
    saveFeature,
    deleteFeature,
    saveTask,
    deleteTask,
    saveProject,
    deleteProject,
    createTask,
    createFeature,
    createProject,
    updateTaskStatus,
  };
};
