import { Router } from 'express';
import TodoController from '../controllers/controller';
import TodoService from '../services/todo.service';

const router = Router();
const todoService = new TodoService();
const todoController = new TodoController(todoService);

router.post('/todos', todoController.create.bind(todoController));

export default router;
