# Backend Exercise

This project is an implementation of the backend exercise proposed in [backend-exercise](https://sarjai.notion.site/backend-exercise).

## Description

REST API that provides company information and tracks search activity.

## Requirements

- Node.js 18 or higher
- Docker and Docker Compose (optional)

## Installation

### Without Docker

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev

# Start in production mode
npm run build
npm start
```

### With Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Endpoints

### Get Company Information
```
GET /ticker/:ticker
```
Returns information about the company with the specified ticker.

### Get Activity
```
GET /activity
```
Returns a summary of the most popular searches.

## Project Structure

```
src/
  ├── controllers/     # API Controllers
  ├── services/       # Business Logic
  ├── providers/      # Data Providers
  ├── routes/         # Route Definitions
  ├── types/          # TypeScript Type Definitions
  └── index.ts        # Application Entry Point
```

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Docker 