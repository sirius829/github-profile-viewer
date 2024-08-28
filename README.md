# GitHub Profile Viewer

A React-based web application that allows users to search for GitHub profiles using GraphQL and Apollo Client. The application displays user details such as their name, bio, avatar, followers, and repositories. It handles various states like loading, error, and no results, providing a responsive and user-friendly interface.

## Table of Contents

- [Overview](#overview)
- [Key Technologies](#key-technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Design Decisions](#design-decisions)
- [Trade-offs](#trade-offs)
- [Testing Strategy](#testing-strategy)
- [Future Improvements](#future-improvements)

## Overview

The GitHub Profile Viewer is designed to fetch and display GitHub user profiles based on the username input by the user. It uses Material-UI for styling and layout, Apollo Client for managing GraphQL queries and state, and React for building the UI components.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **Apollo Client**: A state management library that enables you to manage both local and remote data with GraphQL.
- **GraphQL**: A query language for your API, which allows fetching only the necessary data.
- **Material-UI (MUI)**: A popular React UI framework for designing responsive and consistent interfaces.
- **Jest and React Testing Library**: Testing frameworks used for unit and integration testing.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/github-profile-viewer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd github-profile-viewer
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to use the application.

## Environment Variables

To run the application, you need a GitHub Personal Access Token with the appropriate permissions to access GitHub's GraphQL API. Follow these steps to set it up:

1. **Create a GitHub Personal Access Token**:
   - Go to [GitHub Settings](https://github.com/settings/tokens).
   - Click on "Generate new token".
   - Select the scopes that you need, usually, you need `read:user` and `user:email` scopes.
   - Generate the token and copy it.

2. **Set Up the `.env` File**:
   - Create a file named `.env` in the root directory of your project.
   - Add the following line to the `.env` file, replacing `YOUR_GITHUB_TOKEN` with your actual GitHub token:

    ```bash
    REACT_APP_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
    ```

3. **Restart the Development Server**:
   - After setting up the `.env` file, restart the development server to apply the changes.

## Design Decisions

### Component-Based Architecture

- **Modular Components**: The app is broken down into reusable components such as `GitHubUserProfile`, `UserListItem`, and `StatusMessage` for clarity and maintainability.
- **Separation of Concerns**: Each component has a distinct responsibility, making the code easier to manage and extend.

### Apollo Client and GraphQL

- **Data Management**: Apollo Client is used for managing data fetching and state management, providing efficient data handling and caching.
- **GraphQL**: Allows querying specific fields, reducing over-fetching of data compared to REST APIs.

### Material-UI for UI Consistency

- **Consistency**: Using Material-UI ensures a consistent and professional look across the application.
- **Responsive Design**: Built-in responsive design features help adapt the UI to different screen sizes.

### Error Handling

- **User Feedback**: Error messages and loading states provide feedback to users, improving the user experience.
- **StatusMessage Component**: Centralizes the display of various application states (e.g., welcome message, errors, no results).

## Trade-offs

1. **Performance vs. Simplicity**: The use of Apollo Client and Material-UI increases ease of development but may impact the bundle size and performance.
2. **Flexibility vs. Consistency**: Material-UI offers consistent design but may limit customization options without additional configuration.
3. **Testing in Mocked Environment**: Using mocks for testing provides isolation but may not cover all real-world scenarios.

## Testing Strategy

- **Unit Testing**: Tests individual components using Jest and React Testing Library.
- **Integration Testing**: Ensures that the components interact correctly, using Apollo’s MockedProvider to simulate API responses.
- **Error Scenarios**: Tests cover various states including loading, error handling, and no results scenarios.

## Future Improvements

1. **Enhanced Error Handling**: Differentiate error messages based on error types for better user experience.
2. **Performance Optimization**: Use code splitting and lazy loading to improve application load times.
3. **UI Customization**: Introduce more custom styling to create a unique look beyond Material-UI’s defaults.
4. **End-to-End Testing**: Implement e2e tests to simulate real user interactions and ensure application reliability.
