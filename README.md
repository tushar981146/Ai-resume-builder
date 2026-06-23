# Full Stack GenAI - Interview Preparation Platform

An AI-powered full-stack application that helps candidates prepare for job interviews using Google's GenAI technology. The platform analyzes your resume and job description to generate personalized interview insights, including technical questions, behavioral questions, skill gap analysis, and a detailed preparation roadmap.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

## Project Overview

This full-stack application leverages Google's GenAI API to provide intelligent interview preparation. It features:

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **AI-Powered Analysis**: Generates comprehensive interview reports using structured output from GenAI
- **Interview Preparation**: Provides technical questions, behavioral questions, and personalized preparation plans
- **Resume Analysis**: Analyzes resumes to identify skill gaps and match against job requirements
- **Modern UI**: Responsive React frontend with Sass styling

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **AI Integration**: Google GenAI API
- **File Processing**: Multer, PDF-Parse, Puppeteer
- **Validation**: Zod with JSON Schema conversion

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 7
- **Styling**: Sass
- **HTTP Client**: Axios
- **Linting**: ESLint

## Project Structure

```
full-stack-gen-ai/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── app.js             # Express app configuration
│   │   ├── config/
│   │   │   └── database.js    # MongoDB connection
│   │   ├── controllers/       # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/       # Custom middlewares
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/            # MongoDB models
│   │   │   ├── user.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── blacklist.model.js
│   │   ├── routes/            # API routes
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   └── services/          # Business logic
│   │       └── ai.service.js  # GenAI integration
│   ├── server.js              # Server entry point
│   ├── package.json
│   ├── example.env
│   └── .env
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx            # Root component
│   │   ├── app.routes.jsx     # Route definitions
│   │   ├── main.jsx           # React entry point
│   │   ├── style.scss         # Global styles
│   │   ├── features/
│   │   │   ├── auth/          # Authentication feature
│   │   │   │   ├── auth.context.jsx
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── auth.form.scss
│   │   │   └── interview/     # Interview feature
│   │   │       ├── interview.context.jsx
│   │   │       ├── hooks/
│   │   │       ├── pages/
│   │   │       ├── services/
│   │   │       └── styles/
│   │   └── styles/            # Global stylesheets
│   ├── public/
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── example.env
│   └── .env
│
└── README.md                  # This file
```

## Prerequisites

- **Node.js**: v14+ (v18+ recommended)
- **npm**: v6+
- **MongoDB**: Local or cloud instance (MongoDB Atlas)
- **Google GenAI API Key**: From Google's GenAI platform
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## Installation

### 1. Clone or Setup the Repository

```bash
cd full-stack-gen-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory (see `example.env` for reference):

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/interview-prep
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-prep

# Google GenAI API
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Frontend URL (for CORS)
frontendUrl=http://localhost:5173

# Port (optional, defaults to 3000)
PORT=3000
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory (see `example.env` for reference):

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Features

### Authentication
- User registration and login
- Secure JWT-based sessions
- Cookie-based token storage
- Token blacklist for logout functionality

### Interview Preparation
- **Resume Upload**: Upload PDF/document resumes
- **Job Description Input**: Paste or upload job descriptions
- **AI Analysis**: Get AI-powered insights including:
  - Match score between resume and job
  - Technical interview questions with answers
  - Behavioral interview questions with answers
  - Skill gap analysis with severity levels
  - Day-wise preparation roadmap
- **Interactive UI**: Expandable question cards with clear organization

### Data Models
- **User**: Stores user credentials and profile data
- **Interview Report**: Stores generated interview analysis
- **Blacklist**: Manages token blacklist for logout

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - Logout user

### Interview Routes (`/api/interview`)
- `POST /generate-report` - Generate interview report from resume & job description
- `GET /reports` - Get user's interview reports
- `GET /reports/:id` - Get specific report details

## Development

### Frontend Scripts
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev      # Start with nodemon auto-reload
npm run test     # Run tests (if configured)
```

## Key Technologies Explained

- **Google GenAI**: Provides structured AI-generated interview insights
- **Mongoose**: MongoDB ODM for data modeling
- **Zod**: Runtime type validation with JSON schema support
- **Puppeteer**: Used for web scraping and document processing
- **React Router**: Client-side routing for seamless navigation
- **Axios**: Promise-based HTTP client for API calls

## Future Enhancements

- Real-time mock interviews
- AI-powered response evaluation
- Interview performance analytics
- Community question bank
- Video interview practice
- Multiple language support
- Social sharing features

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Happy Interview Preparation! 🚀**
