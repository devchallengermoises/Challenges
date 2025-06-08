# Tax Challenge

[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-v4-lightgrey)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A robust API service for tax calculations and management built with Node.js, TypeScript, and Express. This project implements a CRUD API with authentication, pagination, and in-memory data storage.

## Tech Stack

- **Runtime:** Node.js v20
- **Language:** TypeScript v5
- **Framework:** Express.js v4
- **Authentication:** JWT
- **Validation:** Express Validator
- **Testing:** Jest
- **Containerization:** Docker
- **API Documentation:** Postman Collection

## Features

- 🔐 JWT Authentication
- 📝 CRUD Operations for Tax Records
- 📊 Pagination Support
- 🚀 TypeScript Implementation
- 🛡️ Input Validation
- 🔒 Rate Limiting
- 🏗️ In-Memory Data Storage
- 📈 Tax Type Management (INCOME, EXPENSE)
- 📅 Date-based Filtering
- 🔍 Search by Description
- 📊 Amount Range Filtering

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/get-started) (optional, for containerized deployment)
- [Git](https://git-scm.com/downloads)

## Getting Started

### Quick Start

1. Clone and install:
```bash
git clone https://github.com/devchallengermoises/tax-challenge.git
cd tax-challenge
npm install
```

2. Set up environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the server:
```bash
npm run dev
```

### Example Usage

1. Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your-password"}'
```

2. Login to get token:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your-password"}'
```

3. Create a tax record:
```bash
curl -X POST http://localhost:3000/api/taxes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Monthly Income",
    "amount": 5000.00,
    "date": "2024-05-01",
    "type": "INCOME"
  }'
```

## Testing the API

1. Import the Postman collection:
   - Open Postman
   - Click "Import" and select the `Tax-Challenge.postman_collection.json` file from the project root

2. Set up the environment in Postman:
   - Create a new environment
   - Add these variables:
     - `baseUrl`: http://localhost:3000
     - `token`: (leave empty, will be set after login)

3. Test the endpoints:
   - First, use the "Register" endpoint to create a user
   - Then, use the "Login" endpoint to get your token
   - The token will be automatically saved to your environment
   - Now you can test all other endpoints

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Tax Records

#### Create Tax Record
```http
POST /api/taxes
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "description": "Income Tax",
  "amount": 1000.50,
  "date": "2024-05-01",
  "type": "INCOME"
}
```

#### Get All Tax Records (with filtering and pagination)
```http
GET /api/taxes?page=1&limit=10&type=INCOME&startDate=2024-01-01&endDate=2024-12-31&minAmount=100&maxAmount=1000&search=income
Authorization: Bearer <your-token>
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `type`: Filter by tax type (INCOME or EXPENSE)
- `startDate`: Filter by start date (YYYY-MM-DD)
- `endDate`: Filter by end date (YYYY-MM-DD)
- `minAmount`: Minimum amount filter
- `maxAmount`: Maximum amount filter
- `search`: Search in description

#### Get Tax Record by ID
```http
GET /api/taxes/:id
Authorization: Bearer <your-token>
```

#### Update Tax Record
```http
PUT /api/taxes/:id
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "description": "Updated Income Tax",
  "amount": 1500.75,
  "date": "2024-05-01",
  "type": "INCOME"
}
```

#### Delete Tax Record
```http
DELETE /api/taxes/:id
Authorization: Bearer <your-token>
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests (if available)

## Response Examples

### Successful Response
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Income Tax",
    "amount": 1000.50,
    "date": "2024-05-01",
    "type": "INCOME",
    "createdAt": "2024-05-01T12:00:00Z",
    "updatedAt": "2024-05-01T12:00:00Z"
  }
}
```

### Paginated Response with Filters
```json
{
  "data": {
    "items": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10,
      "filters": {
        "type": "INCOME",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "minAmount": 100,
        "maxAmount": 1000,
        "search": "income"
      }
    }
  }
}
```

### Error Response
```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS protection
- Environment variable configuration

## Error Handling

The API implements comprehensive error handling for:
- Invalid input data
- Authentication failures
- Resource not found
- Server errors
- Rate limiting exceeded

## Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_ERROR` | Authentication failed | 401 |
| `VALIDATION_ERROR` | Invalid input data | 400 |
| `NOT_FOUND` | Resource not found | 404 |
| `RATE_LIMIT` | Too many requests | 429 |
| `SERVER_ERROR` | Internal server error | 500 |

### Error Handling Examples

1. Authentication Error:
```json
{
  "error": {
    "message": "Invalid credentials",
    "code": "AUTH_ERROR"
  }
}
```

2. Validation Error:
```json
{
  "error": {
    "message": "Invalid input data",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be a positive number"
      }
    ]
  }
}
```

## Development

### Code Style

This project follows the Airbnb JavaScript Style Guide. To maintain code quality:

1. Use ESLint for linting:
```bash
npm run lint
```

2. Format code with Prettier:
```bash
npm run format
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Author

Moises Garcia Levy - May 2024

## Acknowledgments

- Express.js team for the amazing framework
- TypeScript team for the type system
- All contributors and maintainers 

### Option 2: Using Docker

1. Clone the repository:
```bash
git clone https://github.com/devchallengermoises/tax-challenge.git
cd tax-challenge
```

2. Build and start the containers:
```bash
docker compose up
```

The API will be available at `http://localhost:3000` 