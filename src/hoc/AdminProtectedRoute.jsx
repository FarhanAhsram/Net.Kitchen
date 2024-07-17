import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default AdminProtectedRoute;
