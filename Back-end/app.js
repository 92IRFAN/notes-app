import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db.js';

dotenv.config();

import notesRoutes from './routes/notes-routes.js';
import usersRoutes from './routes/users-routes.js';

const app = express();
const port = process.env.PORT || 8080;
app.use('/uploads/images', express.static('uploads/images'));

const corsConfig = {
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
}

app.use(express.json());
app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Server API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
