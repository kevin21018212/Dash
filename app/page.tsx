"use client";

import React, { useEffect, useState } from "react";
import common from "./common.module.scss";

const Page = () => {
  const [allData, setAllData] = useState<{
    games: any[];
    movies: any[];
    tv: any[];
    books: any[];
    music: any[];
  }>({
    games: [],
    movies: [],
    tv: [],
    books: [],
    music: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/all");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setAllData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={common.pageContainer}>Loading...</div>;
  }

  return (
    <div className={common.pageContainer}>
      <h3>All Data</h3>

      {/* GAMES */}
      <section>
        <h4>Games</h4>
        {allData.games.length ? (
          <ul>
            {allData.games.map((game) => (
              <li key={game.id}>{game.title}</li>
            ))}
          </ul>
        ) : (
          <p>No games found.</p>
        )}
      </section>

      {/* MOVIES */}
      <section>
        <h4>Movies</h4>
        {allData.movies.length ? (
          <ul>
            {allData.movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        ) : (
          <p>No movies found.</p>
        )}
      </section>

      {/* TV */}
      <section>
        <h4>TV Shows</h4>
        {allData.tv.length ? (
          <ul>
            {allData.tv.map((tvItem) => (
              <li key={tvItem.id}>{tvItem.title}</li>
            ))}
          </ul>
        ) : (
          <p>No TV shows found.</p>
        )}
      </section>

      {/* BOOKS */}
      <section>
        <h4>Books</h4>
        {allData.books.length ? (
          <ul>
            {allData.books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </section>

      {/* MUSIC */}
      <section>
        <h4>Music</h4>
        {allData.music.length ? (
          <ul>
            {allData.music.map((m) => (
              <li key={m.id}>{m.title}</li>
            ))}
          </ul>
        ) : (
          <p>No music found.</p>
        )}
      </section>
    </div>
  );
};

export default Page;
