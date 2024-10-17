import TodoService from '../src/services/todo.service';
import Todo from './todoModelMock';
import { CreateTodoInput, ITodo } from '../src/models/todo'; // Use the input interface as a type
import { Model } from 'mongoose';
import request from 'supertest';
import app from '../src/app'; 


describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService(Todo as unknown as Model<ITodo>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new todo', async () => {
    const todoData: CreateTodoInput = {
      userDetail: 'Test123',
      title: 'Mock',
      description: 'Learn how to use Docker',
    };

    const savedTodo = await todoService.createTodo(todoData);

    const response = await request(app)
                .post('/api/todos')
                 .send(todoData) 
                .expect(201);

    expect(Todo.create).toHaveBeenCalled();
    expect(savedTodo.title).toBe(todoData.title);
    expect(savedTodo.description).toBe(todoData.description);
  });
});
