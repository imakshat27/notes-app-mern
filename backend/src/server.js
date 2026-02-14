import 'dotenv/config'; // MUST be first

import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.route.js';
import connectDB from './config/database.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from "path";

const app = express();

if(process.env.NODE_ENV !== "production"){
  app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve()
app.use('/api/notes', notesRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("/{*any}",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
}); 
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
});
