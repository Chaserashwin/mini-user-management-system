# Mini User Management System

A full-stack User Management System with authentication, role-based authorization (RBAC), and user lifecycle management. This project was built as part of the Backend Developer Intern Assessment for Purple Merit Technologies.

---

## Project Overview

This application allows users to sign up, log in, manage their profile, and change passwords securely.  
Administrators have additional privileges to view all users and activate or deactivate user accounts.

The system enforces **Role-Based Access Control (RBAC)** at both backend and frontend levels to ensure security and proper authorization.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT Authentication
- bcrypt for password hashing
- Jest + Supertest for testing

### Frontend

- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Deployment

- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

---

## Features

### Authentication

- User signup with email, password, full name
- Secure password hashing
- JWT-based login
- Get current authenticated user

### User (Authenticated)

- View profile
- Update full name and email
- Change password

### Admin (RBAC Enforced)

- View all users with pagination
- Activate user accounts
- Deactivate user accounts

### Security

- JWT authentication
- Role-based authorization (admin / user)
- Inactive users blocked from access
- Protected routes
- Environment variables for secrets
- CORS configured securely

---

## Role-Based Access Control (RBAC)

Roles:

- **user**: Manage own profile and password
- **admin**: Manage all users (activate/deactivate)

RBAC Enforcement:

- Backend middleware ensures admin-only access to sensitive APIs
- Frontend routes and navigation are role-protected
- User role is always derived from the database, never trusted from client input

---

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users` (admin only)
- `PATCH /api/users/:id/activate` (admin only)
- `PATCH /api/users/:id/deactivate` (admin only)
- `PUT /api/users/profile`
- `PUT /api/users/change-password`

---

## Environment Variables

### Backend (.env)

PORT=5000
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=http://localhost:5173

### Frontend (.env)

VITE_API_URL=http://localhost:5000/api

---

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

cd frontend
npm install
npm run dev

## Deployment

Backend deployed on Render
Frontend deployed on Vercel
MongoDB hosted on MongoDB Atlas

## Live URLs

Frontend: <YOUR_VERCEL_URL>
Backend: <YOUR_RENDER_URL>

## Testing

Backend tests implemented using Jest and Supertest.
npm test

## Walkthrough Video

### A 3–5 minute screen-recorded walkthrough demonstrating:

- Authentication
- Role-based access control
- Admin dashboard
- User lifecycle management
- Live deployment

(Video link provided in submission email)

## Author

Ashwin Jaiswal
