# Todo App

A full-stack Todo application featuring a React/Vite frontend and an Express/Node.js backend. The project is managed from a single root directory using `concurrently` to run both the client and server applications simultaneously during development.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Mongoose, Zod
- **Package Manager**: pnpm

## Project Structure

- `/client` - The frontend React application built with Vite.
- `/server` - The backend Express.js server providing the API.

## Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. Install dependencies for the root project (this installs `concurrently`):
   ```bash
   pnpm install
   ```

2. Install dependencies for both the frontend and backend:
   ```bash
   cd client && pnpm install
   cd ../server && pnpm install
   cd ..
   ```

## Available Commands

From the root directory (`d:\todo-app`), you can run the following commands:

### Development

- **Run both Client and Server at once**:
  ```bash
  pnpm run dev
  ```
  _This will start both applications concurrently in the same terminal._

- **Run Client only**:
  ```bash
  pnpm run dev:client
  ```

- **Run Server only**:
  ```bash
  pnpm run dev:server
  ```

### Build

- **Build both Client and Server**:
  ```bash
  pnpm run build
  ```

- **Build Client only**:
  ```bash
  pnpm run build:client
  ```

- **Build Server only**:
  ```bash
  pnpm run build:server
  ```