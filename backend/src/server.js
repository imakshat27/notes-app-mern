import express from 'express';
import notesRouter from './routes/notes.route.js';
const app = express();
app.use(express.json());

app.use('/api/notes', notesRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});