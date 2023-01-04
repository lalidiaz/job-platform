import { createSlice, createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import axios from "axios";
import { RootState } from "../../store";
import { registerThunk, loginThunk } from "./userThunk";
import {
  addUserToLocalStorage,
  removeUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { clearAllJobsState } from "../job/allJobSlice";
import { clearValues } from "../job/jobSlice";

interface IErrorMsg {
  message: string;
}

export interface IUser {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token?: string;
}

interface IUserProps {
  user: IUser;
}

export interface IUserState {
  isLoading: boolean;
  user: IUser | null;
  isSidebarOpen: boolean;
  error: string | null | {};
}

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
  error: null,
} as IUserState;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { email: string; name: string; password: string }, thunkApi) => {
    return registerThunk("/auth/register", user, thunkApi);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkApi) => {
    return loginThunk("/auth/login", user, thunkApi);
  }
);

export const updateUser = createAsyncThunk<IUserProps, IUser>(
  "user/updateUser",
  async (user, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const response = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${state.user?.user?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          message = "Unauthorized";
          thunkApi.dispatch(logoutUser(message));
          toast.error(message);
          return thunkApi.rejectWithValue(message);
        }
        message = error.response.data.msg;
      } else message = String(error);
      toast.error(message);
      return thunkApi.rejectWithValue(message as IErrorMsg);
    }
  }
);

export const clearStoreValues = createAsyncThunk(
  "user/clearStore",
  async (message: string, thunkApi) => {
    try {
      thunkApi.dispatch(logoutUser(message));
      thunkApi.dispatch(clearAllJobsState());
      thunkApi.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserToLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
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
        } else {
          state.error = action.error;
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
        } else {
          state.error = action.error;
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (payload) {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;
          addUserToLocalStorage(user);
          toast.success(
            `Profile updated:${user.name}, ${user.lastName}, ${user.location} and ${user.email}`
          );
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.error = action.payload;
        } else {
          state.error = action.error;
        }
      })
      .addCase(clearStoreValues.rejected, (state, action) => {
        toast.error("Sorry, there was an error.");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
