// api.js
const API_URL = 'http://localhost:3000/api';

// Generic function to make API requests
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Include Authorization header if token is available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Make the API request
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
}
