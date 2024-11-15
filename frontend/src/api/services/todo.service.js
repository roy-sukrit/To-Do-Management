import apiClient from '../apiClient';

export const fetchTodos = async () => {
  const response = await apiClient.get('/todos');
  return response.data;
};

export const fetchCategories = async (email) => {
    const response = await apiClient.get(`/categories/${email}`);
    console.log("response",response);
    return response.data;
  };

export const createTodo = async (todoData) => {
  const response = await apiClient.post('/todos', todoData);
  return response.data;
};


export const createCategory = async (todoData) => {
    const response = await apiClient.post('/categories', todoData);
    return response.data;
  };