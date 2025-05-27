# Tax Challenge

A robust API service for tax calculations and management built with Node.js, TypeScript, and Express. This project implements a CRUD API with authentication, pagination, and in-memory data storage.

## Features

- 🔐 JWT Authentication
- 📝 CRUD Operations for Tax Records
- 📊 Pagination Support
- 🚀 TypeScript Implementation
- 🛡️ Input Validation
- 🔒 Rate Limiting
- 🏗️ In-Memory Data Storage

## API Testing

A Postman collection is included in the repository to help you test the API endpoints. You can find it at:
```
postman/tax-challenge-api.postman_collection.json
```

To use the collection:
1. Import the collection into Postman
2. Set up the environment variables:
   - `baseUrl`: http://localhost:3007
   - `token`: (will be set automatically after login)

The collection includes all API endpoints with example requests and environment setup.

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

#### Get All Tax Records (with pagination)
```http
GET /api/taxes?page=1&limit=10
Authorization: Bearer <your-token>
```

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

## Quick Start

The easiest way to run the application is using Docker Compose:

```bash
docker compose up
```

This will:
- Build the Docker image
- Start the application in development mode
- Mount your local code for live reloading
- Set up all necessary environment variables

The API will be available at `http://localhost:3007`

## Manual Setup

### Prerequisites
- Node.js 20 or higher
- Docker (optional, for containerized deployment)

### Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd tax-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3007
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
```

4. Start the development server:
```bash
npm run dev
```

### Docker Setup (Alternative to Docker Compose)

1. Build the Docker image:
```bash
docker build -t tax-challenge .
```

2. Run the container:
```bash
docker run -p 3007:3007 tax-challenge
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server

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

### Paginated Response
```json
{
  "data": {
    "items": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

### Error Response
```json
{
  "error": {
    "message": "Invalid input data",
    "code": "VALIDATION_ERROR",
    "details": [...]
  }
}
```

## License

MIT License - See LICENSE file for details

## Author

Moises Garcia Levy - May 2025 