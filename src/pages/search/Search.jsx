import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "../../Component/Search/SearchResult";
import React, { useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";

const SearchForm = () => {
  // states ban đầu
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // hàm click nút search
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  // hàm click nút reset
  const handleReset = (e) => {
    e.preventDefault();
    setSearchInput("");
    setQuery("");
  };

  return (
    <div className="search">
      <Navbar />
      <div className="searchContainer">
        <form className="form">
          <div className="formInput">
            <input
              className="input"
              type={"text"}
              value={searchInput}
              placeholder="Type Keywords"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FontAwesomeIcon className="navBarSearch" icon={faSearch} />
          </div>
          <div className="buttonContainer">
            <button
              className="resetButton"
              type="button"
              onClick={(e) => {
                handleReset(e);
              }}
            >
              RESET
            </button>
            <button
              className="searchButton"
              type="submit"
              onClick={(e) => handleSearch(e)}
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <SearchResult search={query} />
    </div>
  );
};

export default SearchForm;
