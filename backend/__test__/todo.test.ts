import request from 'supertest';
import app from '../src/app';
import { describe, it, expect } from '@jest/globals';


describe('ToDo API', () => {
  let createdTodoId: number;

  // Test for creating a new ToDo
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test ToDo' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test ToDo');
    expect(res.body).toHaveProperty('completed', false);
    
    createdTodoId = res.body.id; // Save the created Todo ID for other tests
  });

  // Test for getting all ToDos
  it('should retrieve all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); // Assuming at least 1 ToDo created
  });

  // Test for updating a ToDo
  it('should update an existing todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ completed: true });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdTodoId);
    expect(res.body).toHaveProperty('completed', true);
  });

  // Test for deleting a ToDo
  it('should delete a todo', async () => {
    const res = await request(app).delete(`/api/todos/${createdTodoId}`);
    expect(res.statusCode).toEqual(204);
  });
});
