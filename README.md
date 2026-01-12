# REST API - Assignment 1

A REST API built with Node.js, Express, TypeScript, and MongoDB featuring full CRUD operations for Posts and Comments.

## Features

- **Posts API**: Create, read, update posts
- **Comments API**: Full CRUD operations (Create, Read, Update, Delete)
- **TypeScript**: Type-safe implementation
- **MongoDB**: NoSQL database with Mongoose ODM
- **Error Handling**: Centralized error handling middleware
- **Validation**: Schema-level validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose)
- **Dev Tools**: Nodemon, ts-node

## Project Structure

```
Assigment 1/
├── src/
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Error handling
│   ├── config/          # Database connection
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/
│   └── requests.rest    # API testing file
├── .env.example         # Environment template
├── tsconfig.json        # TypeScript config
└── package.json
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v20.9.0 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 2. Clone Repository

```bash
git clone <repository-url>
cd "Assigment 1"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup MongoDB Atlas

1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster (Free M0 tier)
3. **Database Access**:
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and Write" privileges
4. **Network Access**:
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allows access from anywhere)
5. **Get Connection String**:
   - Click "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name

### 5. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:

```
PORT=3000
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.xxxxx.mongodb.net/assignment1?retryWrites=true&w=majority
NODE_ENV=development
```

### 6. Run the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Build for production**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Posts API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts?sender=<id>` | Get posts by sender |
| GET | `/api/posts/:id` | Get post by ID |
| PUT | `/api/posts/:id` | Update a post |

### Comments API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/comments` | Create a new comment |
| GET | `/api/comments` | Get all comments |
| GET | `/api/comments?postId=<id>` | Get comments by post ID |
| GET | `/api/comments/:id` | Get comment by ID |
| PUT | `/api/comments/:id` | Update a comment |
| DELETE | `/api/comments/:id` | Delete a comment |

## Testing the API

### Using REST Client (VS Code Extension)

1. Install the "REST Client" extension in VS Code
2. Open [tests/requests.rest](tests/requests.rest)
3. Click "Send Request" above each request
4. Copy actual IDs from responses into the variables at the top
5. Run subsequent tests with real IDs

### Example Request Flow

1. **Create a post**:
   ```http
   POST http://localhost:3000/api/posts
   Content-Type: application/json

   {
     "title": "My First Post",
     "content": "This is the content of my first post",
     "sender": "user123"
   }
   ```

2. **Copy the `_id` from the response**

3. **Get that post**:
   ```http
   GET http://localhost:3000/api/posts/<paste-id-here>
   ```

## Data Models

### Post Schema

```typescript
{
  title: string,        // Required, min 3 characters
  content: string,      // Required, min 10 characters
  sender: string,       // Required
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

### Comment Schema

```typescript
{
  postId: ObjectId,     // Required, references Post
  content: string,      // Required, min 1 character
  author: string,       // Required
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

## Git Workflow

This project follows a collaborative Git workflow:

1. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

3. **Push to remote**:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Create Pull Request** on GitHub

5. **Partner reviews and approves**

6. **Merge to main**

## Response Format

All API responses follow this format:

**Success Response**:
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response**:
```json
{
  "success": false,
  "status": 404,
  "message": "Post not found"
}
```

## HTTP Status Codes

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Development Team

This project is developed collaboratively by two developers:
- Developer 1: Posts API implementation
- Developer 2: Comments API implementation

Each feature is implemented in a separate branch with pull request review.

## License

ISC

## Assignment Notes

This project fulfills the requirements for Assignment 1:
- REST API with Node.js and Express
- Full CRUD for Comments
- Posts API with all required endpoints
- TypeScript implementation
- MongoDB integration
- Manual testing via requests.rest
- Collaborative Git workflow with pull requests
