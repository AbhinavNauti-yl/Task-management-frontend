import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: Boolean(localStorage.getItem("token"))
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Handle login success
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };
      state.token = action.payload.accessToken;
      // Save token to localStorage
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify({
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      }));
    },

    updateSuccess: (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };

      // Save token to localStorage
      localStorage.setItem("user", JSON.stringify({
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      }));
    },
    
    // Handle logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      // Remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout, updateSuccess } =
  authSlice.actions;

export default authSlice.reducer;
