import Todo, { ITodo } from '../models/todo';

class TodoService {
    async createTodo(userDetail: string, title: string, description: string): Promise<ITodo> {
        const todo = new Todo({ userDetail, title, description });
        return await todo.save();
    }
}

export default TodoService;
