const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/main';

const request = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const config = {
    method: options.method || 'GET',
    headers: isFormData
      ? { ...options.headers }
      : { 'Content-Type': 'application/json', ...options.headers },
    body: options.body || undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export default {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
};
