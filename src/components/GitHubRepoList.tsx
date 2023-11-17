/**
 * GitHubRepoList.tsx
 * Copyright (c) 2023 Flexera Assigment
 *
 * Description : This file includes Logic of List of some results which is provided by the Github API
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GitHubRepoList.css";

// Define the shape of a GitHub repository
interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

/**
 *Description: Define the shape of the flags object
 */
interface Flags {
  [key: number]: boolean;
}
/** 
 *Description: State for repositories, current page, and flags
 Retrieve stored flags from local storage or default to an empty object
 */
const GitHubRepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [flags, setFlags] = useState<Flags>(() => {
    const storedFlags = localStorage.getItem("githubRepoFlags");
    return storedFlags ? JSON.parse(storedFlags) : {};
  });
  /**
   *Description: Fetch repositories from GitHub API when the page changes
   */

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=${page}`,
          {
            headers: {
              "User-Agent": "GitHubRepoExplorer",
            },
          }
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error("Error fetching repositories", error);
      }
    };

    fetchRepos();
  }, [page]);
  /**
   *  Description: Toggle the flag for a specific repository
   *  Create a new flags object with the updated flag for the specific repository
   *  Store the updated flags in local storage
   */
  const handleToggleFlag = (id: number) => {
    setFlags((prevFlags) => {
      const newFlags = { ...prevFlags, [id]: !prevFlags[id] };

      localStorage.setItem("githubRepoFlags", JSON.stringify(newFlags));
      return newFlags;
    });
  };
/**
   *  Description: 
   *   Header 
   *   List of repositories
   *   Repository avatar 
   *   Repository information
   *   Repository description
   *   full name {repo.full_name}
   *   Display checkmark if the flag is set, otherwise display plus symbol 
   *  {flags[repo.id] ? "✔" : "+"}     
   *  Pagination: It consists of Prev and next button and initally prev button will be disabled         
   */
  return (
    <div>
      <h1>GitHub Repository List</h1>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <img src={repo.owner.avatar_url} alt="Owner Avatar" />

            <div className="repo-info">
              {/* Repository full name */}
              <h3>{repo.full_name}</h3>
              <p className="description">{repo.description}</p>
            </div>

            {/* Flag button */}
            <button
              onClick={() => handleToggleFlag(repo.id)}
              className={
                flags[repo.id] ? "flag-button selected" : "flag-button"
              }
            >
              {/* Display checkmark if the flag is set, otherwise display plus symbol */}
              {flags[repo.id] ? "✔" : "+"}
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {/* Previous page button with left arrow symbol */}
        <button
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 1}
        >
          &#8592; {/* Left arrow symbol */}
        </button>

        {/* Display current page number */}
        <span>Page {page}</span>

        {/* Next page button with right arrow symbol */}
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          &#8594; {/* Right arrow symbol */}
        </button>
      </div>
    </div>
  );
};

export default GitHubRepoList;
