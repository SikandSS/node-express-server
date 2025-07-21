# Node Express Server

A robust Express.js server with user authentication, validation, logging, error handling, API documentation, and CI/CD integration.

## Features

- **User Authentication**: Local strategy with Passport.js (demo user included)
- **User Registration & Login**: Register and login endpoints with validation
- **Session Management**: Express-session for user sessions
- **Input Validation**: Joi schemas and middleware for user and login data
- **CORS**: Custom CORS middleware with allowed origins
- **Security**: Helmet for HTTP headers, compression for performance
- **Logging**: Winston for app logs, Morgan for HTTP logs (logs to `logs/app.log`)
- **Error Handling**: Centralized error handler middleware
- **API Documentation**: Swagger UI at `/api-docs`
- **Testing**: Jest and Supertest for endpoint testing
- **MongoDB Integration**: Mongoose for database connection
- **CI/CD**: Travis CI, Coveralls, and Codacy integration for automated testing and coverage

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or remote)

### Installation
```sh
npm install
```

### Environment Variables
Create a `.env` file with:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/express-server
SESSION_SECRET=your_secret_key
```

### Running the Server
```sh
npm start
```

### Development Mode
```sh
npm run dev
```

### Running Tests
```sh
npm test
```

## API Endpoints

### `POST /users` — Register a new user
- **Body:** `{ name, email, password }`
- **Validation:** Name (3-30 chars), valid email, password (min 6 chars)
- **Response:** `201 Created` on success

### `POST /users/login` — Login
- **Body:** `{ username, password }`
- **Response:** `200 OK` with user info on success

### `GET /users/profile` — Get user profile (protected)
- **Requires authentication**
- **Response:** `200 OK` with user info

### `GET /` — Health check
- **Response:** `Hello, World!`

### API Docs
- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Middleware
- **CORS**: Only allows requests from `http://localhost:3000` and `https://yourdomain.com`
- **Validation**: Validates request bodies using Joi schemas
- **Error Handler**: Logs errors and returns JSON error responses
- **Session**: Stores user sessions securely

## Logging
- **Winston**: Logs to console and `logs/app.log`
- **Morgan**: HTTP request logging via Winston

## Testing
- **Jest** and **Supertest** for endpoint tests
- Example: `GET /` returns `Hello, World!`

## Continuous Integration
- **Travis CI**: Automated testing and coverage on push
- **Coveralls**: Code coverage reporting
- **Codacy**: Code quality and coverage analysis

## Project Structure
```
├── config/           # Passport config
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── routes/           # Express routes
├── utils/            # Logger, etc.
├── validation/       # Joi schemas
├── logs/             # Winston log files
├── index.js          # App entry point
├── index.test.js     # Example test
```

## License
ISC 