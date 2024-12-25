import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// Use the connection string from the JSON config
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.ry7sn.mongodb.net/?retryWrites=true&w=majority&appName=notesapp`);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
