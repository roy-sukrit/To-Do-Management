import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_QA_API || 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default apiClient;
