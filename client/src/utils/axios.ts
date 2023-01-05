import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "./localStorage";
import { toast } from "react-toastify";
import { clearStoreValues, logoutUser } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://job-platform-v2.onrender.com/api/v2",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers!["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (
  error: { response: { status: number; data: { msg: string } } },
  thunkApi: { dispatch: Dispatch; rejectWithValue: (arg0: string) => any }
) => {
  if (error.response.status === 401) {
    //DOUBLE CHECK THIS BUG
    // thunkApi.dispatch(clearStoreValues());
    toast.error(error.response.data.msg);
    return thunkApi.rejectWithValue("Unauthorized! Logging out...");
  }
  toast.error(error.response.data.msg);
  return thunkApi.rejectWithValue(error.response.data.msg);
};

export default customFetch;
