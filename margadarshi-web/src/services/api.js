import axios from 'axios';

// Using the render.com backend server for all APIs
const API_URL = 'https://margadarshi-ggkj.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
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

// Add response interceptor for auth error handling
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
    const response = await api.put('/api/auth/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error.response ? error.response.data : { message: 'Failed to update profile.' };
  }
};

export const uploadProfilePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append('profilePhoto', file);
    
    const response = await api.post('/api/auth/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload profile photo error:', error);
    throw error.response ? error.response.data : { message: 'Failed to upload profile photo.' };
  }
};

export const getProfilePhoto = async () => {
  try {
    const response = await api.get('/api/auth/photo', {
      responseType: 'blob', // Important for image data
    });
    
    // Create object URL from blob for display
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Get profile photo error:', error);
    throw error.response ? error.response.data : { message: 'Failed to get profile photo.' };
  }
};

export const getColleges = (params) => {
  return api.get('/api/colleges', { params: params });
};

export const getCollegeSuggestions = (params) => {
  return api.get('/api/colleges/suggest', { params: params });
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