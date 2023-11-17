// src/components/__tests__/GitHubRepoList.test.tsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GitHubRepoList from '../GitHubRepoList';

describe('GitHubRepoList Component', () => {
  test('renders GitHubRepoList component', () => {
    render(<GitHubRepoList />);
    const headerElement = screen.getByText(/GitHub Repository List/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays repositories with avatar, full name, and description', () => {
    render(<GitHubRepoList />);
    const avatarElement = screen.getByAltText(/Owner Avatar/i);
    const fullNameElement = screen.getByText(/freeCodeCamp\/freeCodeCamp/i);
    const descriptionElement = screen.getByText(/freeCodeCamp\.org's open-source codebase/i);

    expect(avatarElement).toBeInTheDocument();
    expect(fullNameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('toggles flag when clicking on the flag button', () => {
    render(<GitHubRepoList />);
    const flagButton = screen.getByText(/\+/i);

    fireEvent.click(flagButton);

    const selectedFlagButton = screen.getByText(/✔/i);
    expect(selectedFlagButton).toBeInTheDocument();
  });

  test('pagination buttons update the page number', () => {
    render(<GitHubRepoList />);
    const leftArrowButton = screen.getByText(/←/i);
    const rightArrowButton = screen.getByText(/→/i);

    fireEvent.click(rightArrowButton); // Go to the next page
    let pageNumber = screen.getByText(/Page 2/i);
    expect(pageNumber).toBeInTheDocument();

    fireEvent.click(leftArrowButton); // Go back to the previous page
    pageNumber = screen.getByText(/Page 1/i);
    expect(pageNumber).toBeInTheDocument();
  });

});
