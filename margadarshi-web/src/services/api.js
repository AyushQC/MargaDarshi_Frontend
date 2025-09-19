import axios from 'axios';

// Using the render.com backend server
const API_URL = 'https://margadarshi-ggkj.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Authentication error. Token is invalid or expired. Logging out.");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('quizResults');
      // Force a redirect to the login page to re-authenticate
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error.response ? error.response.data : { message: 'Registration failed. Please try again later.' };
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/api/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error.response ? error.response.data : { message: 'OTP verification failed. Please try again.' };
  }
};

export const loginUser = async (email) => {
  try {
    const response = await api.post('/api/auth/login', { email });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : { message: 'Login failed. Please try again later.' };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response ? error.response.data : { message: 'Logout failed. Please try again later.' };
  }
};

export const updateProfile = async (userData) => {
  try {
    // Note: Your backend doesn't seem to handle file uploads for the profile picture yet.
    // This request will only send JSON data.
    const response = await api.put('/api/auth/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error.response ? error.response.data : { message: 'Failed to update profile.' };
  }
};

export const getColleges = (params) => {
  return api.get('/api/colleges', { params: params });
};

export const getQuiz = () => {
  return api.get('/api/auth/quiz');
};

export const submitQuiz = (answers) => {
  return api.post('/api/quiz/submit', { answers });
};

export const getCareerDetails = (careerTitle) => {
  return api.post('/api/career/details', { career_title: careerTitle });
};

export default api;