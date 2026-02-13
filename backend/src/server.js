import 'dotenv/config'; // MUST be first

import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.route.js';
import connectDB from './config/database.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 4000;
app.use('/api/notes', notesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
});
