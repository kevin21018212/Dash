const handleRequest = async (url, method, body, onSuccess, onError) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
      window.location.reload(); // Force page refresh
    } else {
      const errorData = await response.json();
      onError(`Error: ${errorData}`);
    }
  } catch (error) {
    onError(`Error: ${error}`);
  }
};

export const handleSaveContent = (url, content, onSuccess, onError) =>
  handleRequest(url, "PUT", content, onSuccess, onError);

export const handleDeleteContent = (url, onSuccess, onError) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (confirmDelete) {
    handleRequest(url, "DELETE", null, onSuccess, onError);
  }
};

export const handleSaveTask = (task, updatedTask) =>
  handleSaveContent(
    `/api/task?taskId=${task.task_id}`,
    updatedTask,
    null,
    (error) => console.error(error)
  );

export const handleDeleteTask = (task) =>
  handleDeleteContent(`/api/task?taskId=${task.task_id}`, null, (error) =>
    console.error(error)
  );

export const handleSaveProject = (project, updatedProject) =>
  handleSaveContent(
    `/api/project?projectId=${project.project_id}`,
    updatedProject,
    null,
    (error) => console.error(error)
  );

export const handleDeleteProject = (project) =>
  handleDeleteContent(
    `/api/project?projectId=${project.project_id}`,
    null,
    (error) => console.error(error)
  );

export const handleSaveFeature = (feature, editedFeature) =>
  handleSaveContent(
    `/api/feature?featureId=${feature.feature_id}`,
    editedFeature,
    (updatedFeature) => {
      console.log("Feature saved", updatedFeature);
      window.location.reload(); // Force page refresh
    },
    (error) => console.error(error)
  );

export const handleDeleteFeature = (feature) =>
  handleDeleteContent(
    `/api/feature?featureId=${feature.feature_id}`,
    () => {
      console.log("Feature deleted");
      window.location.reload(); // Force page refresh
    },
    (error) => console.error(error)
  );

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
