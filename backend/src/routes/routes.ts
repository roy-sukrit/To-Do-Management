import { Router } from 'express';
import { TodoController } from '../controllers';
import TodoService from '../services/todo.service';
import Todo from '../models/todo';
import Category from '../models/category';

const router = Router();
const todoService = new TodoService(Todo,Category);
const todoController = new TodoController(todoService);

/**
 * To DO APIs
 */

// POST - Create a new To-Do
router.post('/todos', todoController.create.bind(todoController));

// GET - Retrieve all To-Dos
router.get('/todos', todoController.getAll.bind(todoController));

// GET - Retrieve a specific To-Do by ID
router.get('/todos/:categoryId', todoController.getTodoByCategoryId.bind(todoController));

// PUT - Update a specific To-Do by ID
router.put('/todos/:id', todoController.update.bind(todoController));

// DELETE - Remove a specific To-Do by ID
router.delete('/todos/:id', todoController.delete.bind(todoController));

/**
 * Category APIS
 */
// POST - Create a new category (you might need to implement this method in your controller)
router.post('/categories', todoController.createCategory.bind(todoController));

// GET - Retrieve all categories (you might need to implement this method in your controller)
router.get('/categories/:email', todoController.getAllCategories.bind(todoController));


router.delete('/categories/:id', todoController.deleteCategory.bind(todoController));


// Update Category

router.put('/categories', todoController.updateCategoryByEmail.bind(todoController));



export default router;
