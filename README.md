# IPH Technical Assesment

Backend server for the IPH Terminal Management System.

## Overview

This backend server provides the necessary APIs for managing terminals in the IPH Terminal Management System. It handles user authentication, CRUD operations for terminals, and integrates with a MongoDB database.

## Getting Started

**Prerequisites:**

- Node.js installed
- MongoDB server running

**Installation:**

```bash
# Install dependencies
npm install
# Start the server in development mode with automatic restart
npm run start
# Build the production-ready app
npm run build
```

# MongoDB User

USER_DB=your_mongodb_user

# MongoDB Password

PASS_DB=your_mongodb_password

# MongoDB Database Name

DB_NAME=your_mongodb_database_name

# JWT secret for authentication

JWT_SECRET=your_jwt_secret

# Port for the server to listen on

PORT=your_server_port

<br/>

**Used technologies:**

```
- Typescript
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin resource sharing
```

<br/>

**Features:**

```
- RESTful APIs for managing terminals
- User authentication with JWT
- Secure password hashing using bcrypt
- CORS support for cross-origin requests
```

<br/>
