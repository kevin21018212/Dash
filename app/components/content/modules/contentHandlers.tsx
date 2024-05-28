export const handleSaveContent = async (url, content, onSuccess, onError) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    if (response.ok) {
      const updatedContent = await response.json();
      onSuccess(updatedContent);
    } else {
      const errorData = await response.json();
      onError(`Error editing content: ${errorData}`);
    }
  } catch (error) {
    onError(`Error editing content: ${error}`);
  }
};

export const handleDeleteContent = async (url, onSuccess, onError) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      onSuccess();
    } else {
      const errorData = await response.json();
      onError(`Error deleting content: ${errorData}`);
    }
  } catch (error) {
    onError(`Error deleting content: ${error}`);
  }
};

export const handleSaveTask = async (task, updatedTask, onTaskUpdate) => {
  await handleSaveContent(
    `/api/tasks/${task.task_id}`,
    updatedTask,
    onTaskUpdate,
    (error) => console.error(error)
  );
};

export const handleDeleteTask = async (task, onTaskUpdate) => {
  await handleDeleteContent(
    `/api/tasks/${task.task_id}`,
    () => onTaskUpdate(null),
    (error) => console.error(error)
  );
};

export const handleSaveProject = async (
  project,
  updatedProject,
  onProjectUpdate
) => {
  await handleSaveContent(
    `/api/projects/${project.project_id}`,
    updatedProject,
    onProjectUpdate,
    (error) => console.error(error)
  );
};

export const handleDeleteProject = async (project, onProjectUpdate) => {
  await handleDeleteContent(
    `/api/projects/${project.project_id}`,
    () => onProjectUpdate(null),
    (error) => console.error(error)
  );
};

export const handleSaveFeature = async (feature, editedFeature) => {
  await handleSaveContent(
    `/api/features/${feature.feature_id}`,
    editedFeature,
    (updatedFeature) => console.log("Feature saved", updatedFeature),
    (error) => console.error(error)
  );
};

export const handleDeleteFeature = async (feature) => {
  await handleDeleteContent(
    `/api/features/${feature.feature_id}`,
    () => console.log("Feature deleted"),
    (error) => console.error(error)
  );
};

export const handleTaskUpdate = (
  feature,
  selectedTask,
  updatedTask,
  setSelectedTask,
  setIsExpanded
) => {
  if (updatedTask) {
    const updatedTasks = feature.tasks.map((task) =>
      task.task_id === updatedTask.task_id ? updatedTask : task
    );
    feature.tasks = updatedTasks;
    setSelectedTask(updatedTask);
  } else {
    const updatedTasks = feature.tasks.filter(
      (task) => task.task_id !== selectedTask?.task_id
    );
    feature.tasks = updatedTasks;
    setSelectedTask(null);
    setIsExpanded(false);
  }
};
