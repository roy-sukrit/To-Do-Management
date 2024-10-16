import express from 'express';
import {todoRoutes} from './routes';
import errorHandler from './middlewares/middleware';
import {connectDB} from './database';

const app = express();

app.use(express.json());
app.use('/api', todoRoutes);

//Init Mongoose
connectDB();

// Central Error Handling
app.use(errorHandler);

export default app;
