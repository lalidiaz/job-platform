import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { IJob } from "./jobSlice";

interface IErrorMsg {
  message: string;
}

interface IAllJobs {
  isLoading: boolean;
  jobs: IJob[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: IJob[];
}

interface InitialFilters {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
} as InitialFilters;

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
} as IAllJobs;

export const getAllJobs = createAsyncThunk("allJobs/getJob", async (_, thunkApi) => {
  let url = `/jobs`;

  try {
    const state = thunkApi.getState() as RootState;
    const response = await customFetch.get(url, {
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
});

const allJobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          toast.error(payload as string);
        }
      });
  },
});

export const { showLoading, hideLoading } = allJobSlice.actions;

export default allJobSlice.reducer;
