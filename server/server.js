import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));;

const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this domain to send requests
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204(No Content) status code
}
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to enable parsing JSON data from client requests

// Routes
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
})