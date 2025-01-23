import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("movies");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      return;
    }

    setLoading(true);
    setError(null);

    let apiUrl;

    switch (category) {
      case "movies":
        apiUrl = `/api/movies?query=${encodeURIComponent(query)}`;
        break;
      case "tv":
        apiUrl = `/api/tv?query=${encodeURIComponent(query)}`;
        break;
      case "games":
        apiUrl = `/api/games?query=${encodeURIComponent(query)}`;
        break;
      case "books":
        apiUrl = `/api/books?query=${encodeURIComponent(query)}`;
        break;
      case "music":
        apiUrl = `/api/music?query=${encodeURIComponent(query)}`;
        break;
      default:
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="movies">Movies</option>
        <option value="tv">TV</option>
        <option value="games">Games</option>
        <option value="books">Books</option>
        <option value="music">Music</option>
      </select>

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && (
        <div className="error" style={{ color: "red" }}>
          Error: {error}
        </div>
      )}

      {results && (
        <div className="results">
          <h3>Search Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
