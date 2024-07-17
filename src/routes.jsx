import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

import Home from "./pages/Visitor/Home";
import ListFoods from "./pages/Visitor/ListFoods";
import Favorite from "./pages/Visitor/Favorite";
import DetailFood from "./pages/Visitor/DetailFood";
import UserProfile from "./pages/Visitor/UserProfile";

import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageFoods from "./pages/Admin/ManageFoods";
import AdminProfile from "./pages/Admin/AdminProfile";

import ProtectedRoute from "./hoc/ProtectedRoute";
import AdminProtectedRoute from "./hoc/AdminProtectedRoute";

export const routes = [
  // Auth
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // Visitor
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listfoods",
    element: (
      <ProtectedRoute>
        <ListFoods />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorite",
    element: (
      <ProtectedRoute>
        <Favorite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detailfood/:id",
    element: (
      <ProtectedRoute>
        <DetailFood />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userprofile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },

  // Admin
  {
    path: "/dashboard",
    element: (
      <AdminProtectedRoute>
        <Dashboard />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/manageusers",
    element: (
      <AdminProtectedRoute>
        <ManageUsers />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/managefoods",
    element: (
      <AdminProtectedRoute>
        <ManageFoods />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/adminprofile",
    element: (
      <AdminProtectedRoute>
        <AdminProfile />
      </AdminProtectedRoute>
    ),
  },
];
