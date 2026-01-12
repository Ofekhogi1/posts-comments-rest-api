import express, { Application } from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling (must be last)
app.use(errorHandler);

export default app;
