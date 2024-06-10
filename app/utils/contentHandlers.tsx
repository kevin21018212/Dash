import { useAtom } from "jotai";
import { projectAtom } from "@/app/utils/projectAtom";
import { Project, Feature, Task } from "@/app/types";
export const handleRequest = async (url, method, body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
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
      setProject((prev) => updateStateCallback(prev));
      if (afterSaveCallback) {
        afterSaveCallback();
      }
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
      await handleRequest(url, "DELETE", null);
      setProject((prev) => updateStateCallback(prev));
      if (afterDeleteCallback) {
        afterDeleteCallback();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleFieldChange = (
    field: keyof any,
    value: any,
    state: any,
    setState: (data: any) => void
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
      (prev) => {
        const updatedFeatures = prev.features.map((f) =>
          f.feature_id === editedFeature.feature_id ? editedFeature : f
        );
        return { ...prev, features: updatedFeatures };
      },
      () => setIsEditing(false)
    );
  };

  const deleteFeature = (feature: Feature) => {
    handleDelete(`/api/feature?featureId=${feature.feature_id}`, (prev) => {
      const updatedFeatures = prev.features.filter(
        (f) => f.feature_id !== feature.feature_id
      );
      return { ...prev, features: updatedFeatures };
    });
  };

  const saveTask = (
    task: Task,
    editedTask: Task,
    setIsEditing: (value: boolean) => void,
    setIsEditModalOpen: (value: boolean) => void
  ) => {
    handleSave(
      `/api/task?taskId=${task.task_id}`,
      editedTask,
      (prev) => {
        const updatedFeatures = prev.features.map((feature) => {
          if (feature.feature_id === task.feature_id) {
            const updatedTasks = feature.tasks.map((t) =>
              t.task_id === editedTask.task_id ? editedTask : t
            );
            return { ...feature, tasks: updatedTasks };
          }
          return feature;
        });
        return { ...prev, features: updatedFeatures };
      },
      () => {
        setIsEditing(false);
        setIsEditModalOpen(false);
      }
    );
  };

  const deleteTask = (task: Task) => {
    handleDelete(`/api/task?taskId=${task.task_id}`, (prev) => {
      const updatedFeatures = prev.features.map((feature) => {
        if (feature.feature_id === task.feature_id) {
          const updatedTasks = feature.tasks.filter(
            (t) => t.task_id !== task.task_id
          );
          return { ...feature, tasks: updatedTasks };
        }
        return feature;
      });
      return { ...prev, features: updatedFeatures };
    });
  };

  const saveProject = (
    project: Project,
    editedProject: Project,
    setIsEditing: (value: boolean) => void
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
  };
};
