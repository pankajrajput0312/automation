import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
}

// Load initial state from localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem('token');
    return {
      isAuthenticated: !!token,
      token: token,
      user: null, // You can also store/load user data if needed
    };
  } catch (err) {
    return {
      isAuthenticated: false,
      token: null,
      user: null,
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Still store in localStorage for persistence
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 