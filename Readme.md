# To-Do App with Google Login 🗒️

## Overview

This is a To-Do application built with the MERN stack (MongoDB, Express, React, Node.js), featuring Google OAuth login for secure access. The app allows users to create, view, update, and delete tasks while ensuring data is private and associated with each logged-in user. Continuous Integration (CI) is implemented using Jenkins, along with code quality assurance via SonarQube.

## Features

- **User Authentication**: Secure Google OAuth login.
- **Task Management**: Create, read, update, and delete tasks.
- **User-Specific Tasks**: Each user can only see their own tasks.
- **Persistent Sessions**: Users remain logged in across browser refreshes.
- **CI/CD Pipeline**: Automated tests and builds using Jenkins.
- **Code Quality**: Enforced via SonarQube integration.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Google OAuth 
- **Testing**: Jest, React Testing Library (frontend), Jest (backend)
- **CI/CD**: Jenkins
- **Code Quality**: SonarQube

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (for SonarQube)
- [Jenkins](https://www.jenkins.io/)
- [SonarQube](https://www.sonarqube.org/)
- [Google Developer Console](https://console.developers.google.com/) for OAuth credentials

### Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### Install backend dependencies:
```bash
cd backend
npm install
```
### Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Create a .env file in the backend folder with the following variables:

```bash
MONGODB_URI=<Your MongoDB Connection String>
PORT=<Your JWT Secret>
```

### To start the backend server:

```bash
cd ../backend
npm run dev
```

### To start the frontend server:

```bash
cd ../frontend
npm start
```

### Continuous Integration (CI) Setup
Jenkins Setup - 
Install Jenkins and set up a pipeline that runs tests and builds on every push.
Ensure deployment occurs only if all tests pass.

### SonarQube Setup
1. Run SonarQube with Docker:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube
```
2. Configure SonarQube in the Jenkins pipeline for static code analysis.
3. Ensure code passes SonarQube's quality checks before deployment.

### Project Structure

```bash
├── backend         # Node.js and Express backend
├── frontend        # React frontend
└── Jenkinsfile     # CI/CD pipeline configuration for Jenkins
```

### Future Enhancements
1. Add notifications for task deadlines.
2. Implement task prioritization and categorization.
3. Improve mobile responsiveness for a better user experience.



