import { User } from "../features/user/userSlice";

export const addUserToLocalStorage = (user: User): void => {
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
