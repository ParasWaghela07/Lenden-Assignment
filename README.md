# Secure User Profile & Access Control System

## Project Overview

The **Secure User Profile & Access Control System** is a full-stack web application that allows users to securely register and access their personal profiles using email-based authentication.

Users can register using their **name, email, password, and Aadhaar number**. Sensitive data such as Aadhaar numbers are **encrypted at rest** before being stored in the database. When a user logs in or registers successfully, they are redirected to their profile page where their details are displayed. The Aadhaar number is **decrypted on the server side** before being sent to the client, ensuring security during storage while maintaining usability.

The backend is built using **Node.js and Express**, with **MongoDB (Mongoose)** for data persistence. Authentication is implemented using **JWT (JSON Web Tokens)**. Passwords are hashed using **bcrypt**, and Aadhaar numbers are encrypted using **AES-256-GCM** from Node’s `crypto` module.

The frontend is developed using **React.js with Vite** and styled using **Tailwind CSS**. Protected routes ensure that only authenticated users can access sensitive pages such as the profile page.

---

## Setup / Run Instructions

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or cloud)
* npm

---

### Code Repository

```bash
git clone https://github.com/ParasWaghela07/Lenden-Assignment.git
cd Lenden-Assignment
```

---


### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=4000
MONGOURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AADHAAR_ENCRYPTION_KEY=your_32_byte_hex_key
```

Run the backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:4000
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Documentation

### Authentication APIs

| Method | Endpoint            | Description                              |
| ------ | ------------------- | ---------------------------------------- |
| POST   | `/api/auth/signup`  | Register a new user                      |
| POST   | `/api/auth/login`   | Login existing user                      |
| GET    | `/api/user/profile` | Fetch logged-in user profile (Protected) |

### Authorization

All protected routes require a JWT token in the header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Schema

### User Model

```js
{
  name: String,
  email: String,
  passwordHash: String,
  aadhaarEncrypted: String,
  createdAt: Date, (added by mongoodb)
  updatedAt: Date (added by mongoodb)
}