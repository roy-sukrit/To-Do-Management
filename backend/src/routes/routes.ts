import { Router } from 'express';
import {TodoController} from '../controllers';
import TodoService from '../services/todo.service';
import Todo from '../models/todo';

const router = Router();
const todoService = new TodoService(Todo);
const todoController = new TodoController(todoService);

// POST - TODOs
router.post('/todos', todoController.create.bind(todoController));

export default router;
