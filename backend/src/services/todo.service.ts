import  { CreateTodoInput, ITodo } from '../models/todo'
import { ICategory } from '../models/category';
;
import { Model } from 'mongoose';

class TodoService {
    private todoModel: Model<ITodo>;
    private categoryModel: Model<ICategory>;


    constructor(todoModel: Model<ITodo>,categoryModel:Model<ICategory>) {
        this.todoModel = todoModel;
        this.categoryModel=categoryModel
    }

    // Create new Todo
    async createTodo(todoData: CreateTodoInput): Promise<ITodo> {
      return await this.todoModel.create(todoData);
  }

    // Delete Todo
    async deleteTodo(id: string): Promise<ITodo | null> {
        return await this.todoModel.findByIdAndDelete(id);
    }

    // Get All Todos
    async getAllTodos(): Promise<ITodo[]> {
        return await this.todoModel.find();
    }

   

    // Update Todo
    async updateTodo(id: string, todoData: Partial<CreateTodoInput>): Promise<ITodo | null> {
        return await this.todoModel.findByIdAndUpdate(id, todoData, { new: true });
    }

    // Get Todos by Category
    async getTodoByCategoryId(categoryId: string): Promise<ITodo[]> {
        return await this.todoModel.find({ categories: categoryId }) 
    }

 // Create a new Category with auto-incremented ID
 async createCategory(categoryData: { email:string,name: string; slug: string }): Promise<ICategory> {
  const category = this.categoryModel.create(categoryData);
  return category;
}

// Fetch all categories
async getAllCategories(email: string): Promise<ICategory[]> {
  return await  this.categoryModel.find({ email });
}

async deleteCategoryById(id: string): Promise<void> {
    await  this.categoryModel.findByIdAndDelete(id);
}
async updateCategoryByEmail(email:string, categoryId:string, updateData:any) {
    try {
        const updatedCategory = await this.categoryModel.findOneAndUpdate(
            { _id: categoryId, email }, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        return updatedCategory; 


    } catch (error) {
        throw error;
    }
}
}

export default TodoService;
