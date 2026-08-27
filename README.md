# Task Manager API

A CRUD backend for managing personal tasks, with account-based authentication and per-user data isolation.

## Tech Stack

- Express.js — REST API framework
- MongoDB + Mongoose — database and schema modeling
- bcrypt — password hashing
- jsonwebtoken (JWT) — stateless session/auth management

## Features

- User signup and login with hashed passwords (passwords are never stored in plain text)
- JWT-based authentication — protected routes require a valid token
- Create, read, update, and delete tasks (`title`, `description`, `completed`)
- Every task is linked to the user who created it (`owner` field, referencing the `User` model)
- Users can only view, edit, or delete their **own** tasks — enforced at the query level, not just the UI
- Filter tasks by completion status

## API Endpoints

### Health check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Returns a simple status message |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create a new account (`email`, `password`) |
| POST | `/auth/login` | Log in and receive a JWT |

### Tasks
*All task routes require an `Authorization: Bearer <token>` header.*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks/create` | Create a new task (`title`, `description`) |
| GET | `/tasks/` | Get all tasks belonging to the logged-in user |
| GET | `/tasks/filter?completed=true\|false` | Get the logged-in user's tasks filtered by completion status |
| GET | `/tasks/:id` | Get a single task by id (must be owned by the logged-in user) |
| PUT | `/tasks/edit/:id` | Update a task's title, description, and/or completed status |
| DELETE | `/tasks/delete/:id` | Delete a task by id |

## Environment Variables

Create a `.env` file in the project root:

```
MONGODB_URL=your_mongodb_connection_string
JWTSECRATE=your_jwt_signing_secret
PORT=3000
```

## Setup

```bash
npm install
node index.js
```

## Notes

- Ownership is always derived from the decoded JWT (`req.user.user_id`), never trusted from request bodies — this prevents one user from creating or accessing another user's tasks by guessing an id.
- Passwords are hashed with bcrypt before being saved; plaintext passwords are never persisted.