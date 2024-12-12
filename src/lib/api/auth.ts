import axios from 'axios';
import { LoginFormData, SignUpFormData, AuthResponse } from '@/types/auth';

const API_BASE_URL = 'https://automationapi.getmentore.com/user/auth';

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },

  signup: async (data: SignUpFormData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      };
    }
  },

  sendOTP: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-email`, { email });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP',
      };
    }
  },
}; 