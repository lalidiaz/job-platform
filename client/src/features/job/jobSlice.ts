import { createSlice } from "@reduxjs/toolkit";

interface IObjectKeys {
  [key: string]: string | string[] | boolean;
}

interface IJobs extends IObjectKeys {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
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
} as IJobs;

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state: IJobs, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: () => {},
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
