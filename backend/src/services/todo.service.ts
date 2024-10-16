import Todo, { ITodo,CreateTodoInput } from '../models/todo';
import { Model } from 'mongoose';

class TodoService {
    private todoModel: Model<ITodo>;

    constructor(todoModel: Model<ITodo>) {
      this.todoModel = todoModel;
    }
  
    // Create new Todo
    async createTodo(todoData: CreateTodoInput): Promise<ITodo> {
      return await this.todoModel.create(todoData); 

    }
}

export default TodoService;
