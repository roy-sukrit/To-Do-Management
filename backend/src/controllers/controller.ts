import { Request, Response, NextFunction } from 'express';
import TodoService from '../services/todo.service';

class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userDetail, title, description } = req.body;
            if (!userDetail || !title || !description) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const todo = await this.todoService.createTodo(userDetail, title, description);
            res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    }
}

export default TodoController;
