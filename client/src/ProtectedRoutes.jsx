import { Outlet } from "react-router";
import Login from "./Login";

const ProtectedRoutes = (props) => {
  const useAuth = () => {
    const user = { loggedIn: props.isLoggedIn, currentUser: props.currentUser };
    return user.currentUser && user.loggedIn;
  };
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
