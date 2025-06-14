# User Management

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-Ant%20Design-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white)

A modern Single Page Application built with **React**, **TypeScript**, and **Vite** for efficient user management. Styled using **Ant Design**, with robust state management via **Redux Toolkit** and client-side routing powered by **React Router**.

## 🚀 Features

-   ⚛️ **React & TypeScript**: A solid, type-safe foundation for building modern UIs.
-   ⚡ **Vite**: Next-generation frontend tooling for a blazing-fast development experience.
-   🧭 **React Router DOM**: Seamless client-side routing and page navigation.
-   📦 **Redux Toolkit**: Efficient, predictable, and scalable state management.
-   🎨 **Ant Design (antd)**: An enterprise-class UI design language and React UI library.
-   🧪 **Vitest + Testing Library**: A fast and reliable testing framework for unit and component testing.
-   🛠️ **ESLint & Prettier**: Integrated tools for maintaining high code quality and consistent formatting.
-   📂 **Modular File Structure**: Organized for scalability and maintainability.
-   🔄 **Git Integration**: Version control ready from the start.

## 🛠️ Tech Stack

-   **Framework**: React (with Hooks)
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Routing**: React Router DOM
-   **State Management**: Redux Toolkit
-   **UI Library**: Ant Design
-   **Testing**: Vitest, React Testing Library
-   **Linting & Formatting**: ESLint, Prettier

## 📁 Project Structure

```
project/
├── public/              # Static assets (e.g., favicon, images)
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-based page components
│   ├── store/           # Redux slices, store configuration, and state logic
│   └── App.tsx          # Root application component and router setup
├── index.html           # HTML entry point for Vite
├── package.json         # Project metadata, dependencies, and scripts
├── vite.config.ts       # Vite configuration file
├── tsconfig.json        # TypeScript compiler options
└── .eslintrc.cjs        # ESLint configuration
└── .prettierrc          # Prettier configuration
```

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 16+ recommended) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BalrajMsr/user-management.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd user-management
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```

## 📜 Available Scripts

In the project directory, you can run the following commands:

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Starts the local development server with Hot Reload. |
| `npm run build` | Bundles the app for production in the `dist/` folder.  |
| `npm run preview`| Serves the production build locally for preview.   |
| `npm run test`    | Runs all unit and component tests in watch mode.   |
| `npm run test:ui` | Opens the interactive Vitest UI for testing.       |
| `npm run lint`    | Runs ESLint to find and report issues in the code. |
| `npm run format`  | Formats all code using Prettier.                   |

## 🧪 Testing

This project uses **Vitest** for unit testing and **React Testing Library** for component testing.

-   To run all tests in your terminal:
    ```bash
    npm run test
    ```
-   To open the Vitest UI for a more interactive testing experience:
    ```bash
    npm run test:ui
    ```

## 🔍 Linting & Formatting

Code quality and consistency are enforced by ESLint and Prettier.

-   To check for linting errors:
    ```bash
    npm run lint
    ```
-   To automatically format the entire codebase:
    ```bash
    npm run format
    ```

## 📤 Deployment

1.  **Build the project for production:**
    This command creates an optimized `dist/` directory with all the static assets needed for deployment.
    ```bash
    npm run build
    ```