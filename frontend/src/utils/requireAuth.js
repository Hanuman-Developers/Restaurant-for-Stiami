import { useLocation, Navigate, Outlet } from "react-router-dom";
import { CartState } from "../context/cartItem_context";
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = CartState();
  const location = useLocation();
  console.log(auth);

  return auth.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
