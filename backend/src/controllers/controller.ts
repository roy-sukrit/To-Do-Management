import { Request, Response, NextFunction } from 'express';
import {TodoService} from '../services';
import logger from '../logger';

class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    // Create Todos
    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userDetail, title, description } = req.body;
            if (!userDetail || !title || !description) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const todo = await this.todoService.createTodo({userDetail, title, description});
            logger.info('Created Todo Successfully!')
            res.status(201).json(todo);
            
        } catch (error) {
            logger.error('Create Todo Failed!')

            next(error);
        }
    }
}

export default TodoController;
