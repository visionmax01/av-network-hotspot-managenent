// SearchComponent.js
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(searchQuery);
  };

  return (
    <div className="search-containt">
      <input
        type="text"
        placeholder="Search....."
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleButtonClick}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchComponent;
