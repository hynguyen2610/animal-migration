import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import animalRoutes from './routes/animalRoutes';
import { AppendIsHereMigration } from './migrations/AppendIsHereMigration';
import { AppendMaxAgeMigration } from './migrations/AppendMaxAgeMigration';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Run migrations on startup
    const appendIsHereMigration = new AppendIsHereMigration();
    const appendMaxAgeMigration = new AppendMaxAgeMigration();

    await appendIsHereMigration.execute();  // Run the first migration
    await appendMaxAgeMigration.execute();  // Run the second migration
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware for JSON
app.use(express.json());

// API Routes
app.use("/animals", animalRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
