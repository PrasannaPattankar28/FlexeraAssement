// GitHubRepoListItem.tsx
import React from "react";

interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

interface Flags {
  [key: number]: boolean;
}

interface GitHubRepoListItemProps {
  repo: Repository;
  flags: Flags;
  handleToggleFlag: (id: number) => void;
}

const GitHubRepoListItem: React.FC<GitHubRepoListItemProps> = ({
  repo,
  flags,
  handleToggleFlag,
}) => (
  <li key={repo.id} className="repo-item">
    <img src={repo.owner.avatar_url} alt="Owner Avatar" />
    <div className="repo-info">
      <h3>{repo.full_name}</h3>
      <p className="description">{repo.description}</p>
    </div>
    <button
      onClick={() => handleToggleFlag(repo.id)}
      className={flags[repo.id] ? "flag-button selected" : "flag-button"}
    >
      {flags[repo.id] ? "✔" : "+"}
    </button>
  </li>
);

export default GitHubRepoListItem;
