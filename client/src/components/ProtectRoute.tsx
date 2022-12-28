import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectRoute;
