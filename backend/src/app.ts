import express from 'express';
import {todoRoutes} from './routes';
import errorHandler from './middlewares/middleware';
import {connectDB} from './database';
import cors from 'cors';

const app = express();
app.use(cors({origin:'*'}))

app.use(express.json());
app.use('/api', todoRoutes);
//Init Mongoose
connectDB();

// Central Error Handling
app.use(errorHandler);

export default app;
