## Secure User Profile & Access Control System

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

---

## Authorization & Token Validation

* JWT tokens are issued on **successful login or signup**.
* Tokens are sent from the client in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

* A **token validation middleware** verifies:

  * Token authenticity using `JWT_SECRET`
  * Token expiration
  * User identity before granting access to protected routes

Only authenticated users with a valid token can access secure endpoints such as the profile API.

---

## Security & Testing

### Aadhaar Encryption / Decryption

* Aadhaar numbers are encrypted using **AES-256-GCM** before being stored.
* Decryption happens only on the server when returning data to authenticated users.
* A unique IV is generated for every encryption to ensure ciphertext randomness.

### Unit Testing

* **Jest** is used for backend unit testing.
* Comprehensive unit tests validate:

  * Successful encryption of Aadhaar numbers
  * Correct decryption back to original data
  * Failure on tampered encrypted data
  * Different ciphertexts for the same Aadhaar input

Run tests using:

```bash
npm test
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
  createdAt: Date, // added by MongoDB
  updatedAt: Date  // added by MongoDB
}
```

---

## AI Tool Usage

An AI tool (**ChatGPT**) was used in the development of this project for the following purposes:

1. **Token Validation Utility**

   * Assisted in designing and validating a secure JWT-based authentication middleware to protect backend routes.

2. **Unit Testing for Encryption/Decryption**

   * Helped generate AES-256-GCM based Aadhaar encryption/decryption utilities.
   * Created comprehensive Jest unit tests to validate correctness, randomness, and tamper detection of encrypted data.

The AI tool was used strictly as a **development aid** to enhance security, correctness, and testing quality.

---