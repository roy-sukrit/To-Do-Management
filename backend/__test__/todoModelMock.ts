import { ITodo } from '../src/models/todo';

// Mocked todos array
const todos: ITodo[] = [];

// Mocked Todo model
const Todo = {
    create: jest.fn().mockImplementation((todoData: Omit<ITodo, '_id'>) => {
        const todo: ITodo = {
            _id: 'mockedId', // Add mocked ID
            ...todoData,
        } as ITodo; // Cast to ITodo to enforce type
        todos.push(todo);
        return Promise.resolve(todo);
    }),
    // deleteMany: jest.fn().mockImplementation(() => {
    //     todos.length = 0; // Clear the array
    //     return Promise.resolve();
    // }),
    // find: jest.fn().mockImplementation(() => {
    //     return Promise.resolve(todos);
    // }),
};

export default Todo;
