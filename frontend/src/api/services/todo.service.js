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
  console.log("todoData",todoData);

  const response = await apiClient.post('/todos', todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete(`/categories/${id}`);
  return response.data;
};



export const updateTodo = async (id,payload) => {
  const response = await apiClient.put(`/todos/${id}`,payload);
  return response.data;
};

export const createCategory = async (todoData) => {
    const response = await apiClient.post('/categories', todoData);
    return response.data;
  };

  export const loadTodosByCategory = async (id) => {
    const response = await apiClient.get(`/todos/${id}`);
    console.log("loadTodosByCategory response",response);

    return response.data;
  };