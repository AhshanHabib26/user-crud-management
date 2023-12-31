import express, { Application, Request, Response } from 'express';
import userRouter from './modules/user.router';
const app: Application = express();
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome CRUD Application!',
  });
});

// API Call
app.use('/api/users', userRouter);

// Main Error Handler
app.use(errorHandler);

export default app;
