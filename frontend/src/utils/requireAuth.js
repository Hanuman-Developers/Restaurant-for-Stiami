import { useLocation, Navigate, Outlet } from "react-router-dom";
import { CartState } from "../context/cartItem_context";
const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = CartState();
  const location = useLocation();
  const roles = auth.roles;
  const loc = localStorage.getItem("auth");
  console.log(typeof loc);

  console.log(typeof allowedRoles);

  // return auth.length > 0 ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  // return auth?.email ? (
  //   auth.roles?.User == 2001 ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   )
  // ) : auth.roles?.Admin == 1990 ? (
  //   <Navigate to="/dashboard" state={{ from: location }} replace />
  // ) : (
  //   <></>
  // );

  // return propertyValues.find((val) => val === allowedRoles) ? (
  //   <Outlet />
  // ) : auth?.email ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  return auth?.roles || loc == allowedRoles ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
