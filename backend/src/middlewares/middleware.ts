import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({ message: err.message });
};

export default errorHandler;
