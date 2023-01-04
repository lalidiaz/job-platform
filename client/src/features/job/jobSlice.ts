import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "./allJobSlice";

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

export const createJob = createAsyncThunk("job/createJob", async (job: IJob, thunkApi) => {
  try {
    const response = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as { response: { status: number; data: { msg: string } } },
      thunkApi
    );
  }
});

export const editJob = createAsyncThunk(
  "job/editJob",
  async (
    {
      jobId,
      position,
      company,
      jobLocation,
      jobType,
      status,
    }: {
      jobId: string;
      position: string;
      company: string;
      jobLocation: string;
      jobType: string;
      status: string;
    },
    thunkApi
  ) => {
    try {
      const response = await customFetch.patch(`/jobs/${jobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      thunkApi.dispatch(clearValues());
      return response.data;
    } catch (error) {
      return checkForUnauthorizedResponse(
        error as { response: { status: number; data: { msg: string } } },
        thunkApi
      );
    }
  }
);

export const deleteJob = createAsyncThunk("job/deleteJob", async (jobId: string, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkApi.dispatch(hideLoading());
    return checkForUnauthorizedResponse(
      error as { response: { status: number; data: { msg: string } } },
      thunkApi
    );
  }
});

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
        toast.success(payload as unknown as string);
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
