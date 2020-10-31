import React, { useState } from "react";

const baseURL = process.env.ENDPOINT;

const fetchCoords = async (query) => {
  const endpoint = `${baseURL}/search?q=${query}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const search = async (e) => {
    if (e.key === "Enter") {
      const { lat, lon } = await fetchCoords(query);
      if (lat !== undefined && lon !== undefined) {
        await props.fetchData(lat, lon);
        setQuery("");
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter a city ..."
        className="search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
};

export default SearchBar;
