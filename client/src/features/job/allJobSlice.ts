import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { IJob } from "./jobSlice";

export interface IMontlhyApplications {
  date: string;
  count: number;
}

interface IStats {
  pending: number;
  interview: number;
  declined: number;
}
export interface IAllJobs {
  [x: string]: any;
  isLoading: boolean;
  jobs: IJob[];
  totalJobs: number;
  numPages: number;
  page: number;
  stats?: IStats | null;
  monthlyApplications: IMontlhyApplications[];
}

export interface InitialFilters {
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
  numPages: 1,
  page: 1,
  stats: null,
  monthlyApplications: [],
  ...initialFiltersState,
} as IAllJobs;

export const getAllJobs = createAsyncThunk("allJobs/getAllJobs", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;

    const { page, searchStatus, searchType, sort, search } = state.allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if (search) url = url + `&search=${search}`;

    const response = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${state.user?.user?.token}`,
      },
    });

    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as { response: { status: number; data: { msg: string } } },
      thunkApi
    );
  }
});

export const showStats = createAsyncThunk("allJobs/showStats", async (_, thunkApi) => {
  try {
    const response = await customFetch.get("/jobs/stats");

    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as { response: { status: number; data: { msg: string } } },
      thunkApi
    );
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
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (
          state: { isLoading: boolean; jobs: IJob[]; numPages: number; totalJobs: number },
          { payload }: any
        ) => {
          state.isLoading = false;
          state.jobs = payload.jobs;
          state.numPages = payload.numPages;
          state.totalJobs = payload.totalJobs;
        }
      )
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          toast.error(payload as string);
        }
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          toast.error(payload as string);
        }
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobSlice.actions;

export default allJobSlice.reducer;
