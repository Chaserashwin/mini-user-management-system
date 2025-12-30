import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="font-semibold">
        {user.fullName}
        <span className="ml-2 text-sm text-gray-500">({user.role})</span>
      </div>

      <div className="flex gap-4 items-center">
        <Link className="text-blue-600 hover:underline" to="/profile">
          Profile
        </Link>
        {user.role === "admin" && (
          <Link className="text-blue-600 hover:underline" to="/admin/dashboard">
            Admin
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
