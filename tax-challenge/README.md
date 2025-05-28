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

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/get-started) (optional, for containerized deployment)
- [Git](https://git-scm.com/downloads)

## Installation

### Option 1: Using Git Clone

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tax-challenge.git
cd tax-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env  # if .env.example exists
# Or create .env manually with these variables:
PORT=3007
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
```

4. Start the development server:
```bash
npm run dev
```

### Option 2: Using Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tax-challenge.git
cd tax-challenge
```

2. Build and start the containers:
```bash
docker compose up
```

The API will be available at `http://localhost:3007`

## Testing the API

1. Import the Postman collection:
   - Open Postman
   - Click "Import" and select the `Tax-Challenge.postman_collection.json` file from the project root

2. Set up the environment in Postman:
   - Create a new environment
   - Add these variables:
     - `baseUrl`: http://localhost:3007
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

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in .env file
   - Or kill the process using the port: `lsof -i :3007` then `kill -9 <PID>`

2. **Docker issues**
   - Make sure Docker is running
   - Try `docker compose down` before `docker compose up`
   - Check Docker logs: `docker compose logs`

3. **Node.js version issues**
   - Use nvm to switch Node.js versions: `nvm use 20`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Author

Moises Garcia Levy - May 2025 