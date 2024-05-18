import { useState } from "react";

export default function FeatureCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type,
        size,
        image_url: imageUrl,
        project_id: projectId,
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="card">
      <h2>Create Feature</h2>
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
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
        <button type="submit">Create Feature</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
