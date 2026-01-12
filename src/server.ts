import app from './app';
import connectDB from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
