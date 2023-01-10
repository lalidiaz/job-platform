import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "./localStorage";
import { logoutUser } from "../features/user/userSlice";
import { clearAllJobsState } from "../features/job/allJobSlice";
import { clearValues } from "../features/job/jobSlice";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_URL,
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
    thunkApi.dispatch(logoutUser("Unauthorized"));
    thunkApi.dispatch(clearAllJobsState());
    thunkApi.dispatch(clearValues());
    return thunkApi.rejectWithValue("Unauthorized! Logging out...");
  }

  return thunkApi.rejectWithValue(error.response.data.msg);
};

export default customFetch;
