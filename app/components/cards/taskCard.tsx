import { useState } from "react";

export default function TaskCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [featureId, setFeatureId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type,
        size,
        feature_id: featureId,
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="card">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Feature ID"
          value={featureId}
          onChange={(e) => setFeatureId(e.target.value)}
        />
        <button type="submit">Create Task</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
