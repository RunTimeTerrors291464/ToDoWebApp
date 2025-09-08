# Todo List API

A NestJS-based Todo List API with JWT authentication and PostgreSQL database.

## Features

- ✅ RESTful API for managing todo lists
- ✅ JWT Authentication
- ✅ PostgreSQL database integration
- ✅ Swagger API documentation
- ✅ Docker support

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- External PostgreSQL database (or you can use a cloud database)

### 1. Clone the repository
```bash
git clone https://github.com/RunTimeTerrors291464/ToDoWebApp
cd toDoList
```

### 2. Setup environment variables
```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your database credentials
# You need to provide:
# - DB_HOST: Your PostgreSQL host
# - DB_USERNAME: Your database username  
# - DB_PASSWORD: Your database password
# - DB_NAME: Your database name
# - JWT_SECRET: A secure random string (at least 32 characters)
```

### 3. Run with Docker Compose
```bash
# Build and start the application
docker-compose up -d --build

# View logs
docker-compose logs -f

# The API will be available at:
# - API: http://localhost:3000
# - Swagger Documentation: http://localhost:3000/api
```

### 4. Stop the application
```bash
docker-compose down
```

## Development Mode

If you want to run in development mode with hot reload:

```bash
# Create docker-compose.dev.yml (see below)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (production/development) | Yes |
| PORT | Application port | No (default: 3001) |
| DB_HOST | PostgreSQL host | Yes |
| DB_PORT | PostgreSQL port | No (default: 5432) |
| DB_USERNAME | Database username | Yes |
| DB_PASSWORD | Database password | Yes |
| DB_NAME | Database name | Yes |
| JWT_SECRET | JWT signing secret | Yes |

## API Documentation

Once the application is running, visit http://localhost:3000/api for interactive API documentation powered by Swagger.

## Database Setup

This application requires a PostgreSQL database. You can:

1. **Use a cloud database** (AWS RDS, Google Cloud SQL, etc.)
2. **Use a local PostgreSQL installation**
3. **Add PostgreSQL to docker-compose.yml** (coming soon)

Make sure your database is accessible from the Docker container and update the connection details in your `.env` file.