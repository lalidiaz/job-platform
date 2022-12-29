import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";

interface IErrorMsg {
  message: string;
}

interface IObjectKeys {
  [key: string]: string | string[] | boolean | undefined;
}

interface IJob extends IObjectKeys {
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
}

const initialState = {
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
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
