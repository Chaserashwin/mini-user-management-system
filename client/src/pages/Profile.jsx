import React from "react";
import { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const updateProfile = async () => {
    await api.put("/api/users/profile", { fullName, email });
    setMessage("Profile updated successfully");
  };

  const changePassword = async () => {
    await api.put("/api/users/change-password", { password });
    setMessage("Password changed successfully");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        {message && <p className="text-green-600 mb-3">{message}</p>}

        <input
          className="w-full mb-3 p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={updateProfile}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

        <hr className="my-6" />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="New Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={changePassword}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Change Password
        </button>
      </div>
    </>
  );
}
