import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function ProtectedRoute({ children, admin }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== "admin") return <Navigate to="/" />;
  return children;
}
