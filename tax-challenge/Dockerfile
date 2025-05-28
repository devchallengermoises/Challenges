# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Development stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy source files for development
COPY . .

# Expose port
EXPOSE 3007

# Start the application (will be overridden by docker-compose in dev mode)
CMD ["npm", "start"] 