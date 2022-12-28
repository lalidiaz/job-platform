import { IUser } from "../features/user/userSlice";

export const addUserToLocalStorage = (user: IUser): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserToLocalStorage = (): void => {
  localStorage.removeItem("user");
};

export const getUserToLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
