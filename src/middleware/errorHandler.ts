import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Something went wrong',
  });
};

export default errorHandler;
