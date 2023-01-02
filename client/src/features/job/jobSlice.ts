import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAllJobs } from "./allJobSlice";

interface IErrorMsg {
  message: string;
}

interface IObjectKeys {
  [key: string]: string | string[] | boolean | undefined | number | Date;
}

export interface IJob extends IObjectKeys {
  _id?: string;
  isLoading?: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions?: string[];
  jobType: string;
  statusOptions?: string[];
  status: string;
  isEditing?: boolean;
  editJobId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IEditJob {
  jobId: string;
  job: IJob;
}

const initialState = {
  _id: "",
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
} as IJob;

export const createJob = createAsyncThunk<IJob, IJob>("jobs/createJob", async (job, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const response = await customFetch.post("/jobs", job, {
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
        thunkApi.dispatch(logoutUser("Logging out..."));
        toast.error(message);
        return thunkApi.rejectWithValue(message);
      }
      message = error.response.data.msg;
    } else message = String(error);
    toast.error(message);

    return thunkApi.rejectWithValue(message as IErrorMsg);
  }
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobId: string, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const state = thunkApi.getState() as RootState;
    const response = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${state.user?.user?.token}`,
      },
    });
    thunkApi.dispatch(getAllJobs());
    console.log("response", response);

    return response.data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        thunkApi.dispatch(hideLoading());
        message = "Unauthorized";
        thunkApi.dispatch(logoutUser("Logging out..."));
        toast.error(message);
        return thunkApi.rejectWithValue(message);
      }
      message = error.response.data.msg;
    } else message = String(error);
    toast.error(message);
    thunkApi.dispatch(hideLoading());

    return thunkApi.rejectWithValue(message as IErrorMsg);
  }
});

export const editJob = createAsyncThunk<IEditJob, IJob>(
  "jobs/editJob",
  async ({ jobId, position, company, jobLocation, jobType, status }, thunkApi) => {
    try {
      console.log("jobId", jobId);
      const state = thunkApi.getState() as RootState;
      const response = await customFetch.patch(
        `/jobs/${jobId}`,
        { position, company, jobLocation, jobType, status },
        {
          headers: {
            Authorization: `Bearer ${state.user?.user?.token}`,
          },
        }
      );
      thunkApi.dispatch(clearValues());
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          thunkApi.dispatch(hideLoading());
          message = "Unauthorized";
          thunkApi.dispatch(logoutUser("Logging out..."));
          toast.error(message);
          return thunkApi.rejectWithValue(message);
        }
        message = error.response.data.msg;
      } else message = String(error);
      toast.error(message);
      thunkApi.dispatch(hideLoading());
      console.log("error message", message);
      return thunkApi.rejectWithValue(message as IErrorMsg);
    }
  }
);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state: IJob, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || "" };
    },
    setEditJob: (state, { payload }) => {
      console.log("payload, ", payload);
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          toast.error(payload as string);
        }
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        if (payload) {
          toast.error(payload as string);
        }
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job modified successfully.");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          toast.error(payload as string);
        }
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
