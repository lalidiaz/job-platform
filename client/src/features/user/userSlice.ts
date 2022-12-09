import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import axios from "axios";
import {
  addUserToLocalStorage,
  removeUserToLocalStorage,
  getUserToLocalStorage,
} from "../../utils/localStorage";

export interface User {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
}

interface ErrorMsg {
  message: string;
}

export interface UserState {
  isLoading: boolean;
  user: User | null;
  error: string | null | {};
}

const initialState = {
  isLoading: false,
  user: getUserToLocalStorage(),
  error: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.error = action.payload;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.error = action.payload;
        }
      });
  },
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { email: string; name: string; password: string }, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.msg;
      } else message = String(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message as ErrorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/login", user);
      return response.data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.msg;
      } else message = String(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message as ErrorMsg);
    }
  }
);

export default userSlice.reducer;
