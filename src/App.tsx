/** 
 * App.tsx
 * Copyright (c) 2023 Flexera Assigment
 * 
 * Description : This file includes App.tsx and it consists of Repolist 
 */
import React from 'react';
import GitHubRepoList from './components/GitHubRepoList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <GitHubRepoList />
    </div>
  );
};

export default App;
