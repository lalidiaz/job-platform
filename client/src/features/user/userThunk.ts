import customFetch from "../../utils/axios";
import axios from "axios";
import { toast } from "react-toastify";

interface IErrorMsg {
  message: string;
}

export const registerThunk = async (
  url: string,
  user: { email: string; name: string; password: string },
  thunkApi: { rejectWithValue: (arg0: IErrorMsg) => any }
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data.msg;
    } else message = String(error);
    toast.error(message);
    return thunkApi.rejectWithValue(message as IErrorMsg);
  }
};

export const loginThunk = async (
  url: string,
  user: { email: string; password: string },
  thunkApi: { rejectWithValue: (arg0: IErrorMsg) => any }
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data.msg;
    } else message = String(error);
    toast.error(message);
    return thunkApi.rejectWithValue(message as IErrorMsg);
  }
};
