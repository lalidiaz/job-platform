import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface UserState {
  isLoading: boolean;
  user: string | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { email: string; name: string; password: string }, thunkAPI) => {
    console.log(`Registered user ${JSON.stringify(user)}`);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    console.log(`loginUser user ${JSON.stringify(user)}`);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
