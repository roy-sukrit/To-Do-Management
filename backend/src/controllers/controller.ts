import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services';
import logger from '../logger';
import Category from '../models/category';
import Todo from '../models/todo';

class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    // Create Todos

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email, text, done, categories } = req.body;

            if (!email || !text || !categories) {
                return res.status(400).json({ message: "Email, text, and categories are required." });
            }

            // Assuming categories is an array of objects with name, slug, and _id
            const categoryIds = await Promise.all(
                categories.map(async (cat: any) => {
                    const existingCategory = await Category.findOne({ name: cat.name, slug: cat.slug });
                    // If the category exists, push its _id; otherwise, create it
                    if (existingCategory) {
                        return existingCategory._id;
                    } else {
                        const newCategory = new Category({ name: cat.name, slug: cat.slug });
                        const savedCategory = await newCategory.save();
                        return savedCategory._id;
                    }
                })
            );

            // Create the Todo with the category references
            const todo = new Todo({
                email,
                text,
                done,
                categories: categoryIds, // Using the _id from the categories
            });

            await todo.save();
            res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    }

    // Get all Todos
    async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            // const todos = await this.todoService.getAllTodos();
            const todos = await Todo.find().populate('categories', 'name slug'); // Populate category fields

            res.status(200).json(todos);
        } catch (error) {
            logger.error('Failed to retrieve Todos!');
            next(error);
        }
    }

    // Get Todo by ID
    async getTodoByCategoryId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { categoryId } = req.params;

            if (!categoryId) {
                return res.status(400).json({ message: 'Category ID is required' });
            }

            const todos = await this.todoService.getTodoByCategoryId(categoryId);
            res.status(200).json(todos);
        } catch (error) {
            next(error);
        }
    }

    

    // Update Todo by ID
    async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const { email, text, done, categories } = req.body; // Updated 'category' to 'categories'
            const updatedTodo = await this.todoService.updateTodo(id, { email, text, done, categories }); // Updated 'category' to 'categories'
            if (!updatedTodo) {
                return res.status(404).json({ message: "Todo not found." });
            }
            res.status(200).json(updatedTodo);
        } catch (error) {
            logger.error('Failed to update Todo!');
            next(error);
        }
    }

    // Delete Todo by ID
    async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const deleted = await this.todoService.deleteTodo(id);
            if (!deleted) {
                return res.status(404).json({ message: "Todo not found." });
            }
            res.status(204).send();
        } catch (error) {
            logger.error('Failed to delete Todo!');
            next(error);
        }
    }

    // controllers/todoController.ts
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { name, slug, email } = req.body;
            if (!name || !slug || !email) {
                return res.status(400).json({ message: "Name and slug n email are required for category." });
            }
            const category = await this.todoService.createCategory({ name, slug, email });
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email } = req.params;

            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            const categories = await this.todoService.getAllCategories(email as string);
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Category ID is required' });
            }

            await this.todoService.deleteCategoryById(id);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
    async updateCategoryByEmail(req:Request, res:Response,next:NextFunction):Promise<any> {
        const { email, categoryId, updateData } = req.body; // Get email, categoryId, and updateData from request body

        try {
            const updatedCategory = await this.todoService.updateCategoryByEmail(email, categoryId, updateData);

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found for this email' });
            }

            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            next(error);

        }
    }

}

export default TodoController;
