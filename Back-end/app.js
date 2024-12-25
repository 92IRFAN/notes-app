import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db.js';

dotenv.config();

import notesRoutes from './routes/notes-routes.js';
import usersRoutes from './routes/users-routes.js';

const app = express();
const port = process.env.PORT || 5000;
app.use('/uploads/images', express.static('uploads/images'));

app.use(express.json()); 
app.use(cors());

app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
