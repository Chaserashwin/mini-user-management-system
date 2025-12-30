import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    const res = await api.get(`/api/users?page=${page}`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleStatus = async (id, status) => {
    const action = status === "active" ? "deactivate" : "activate";
    if (!window.confirm("Are you sure?")) return;
    await api.patch(`/api/users/${id}/${action}`);
    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="text-center">
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.fullName}</td>
                  <td className="p-2 border">{u.role}</td>
                  <td className="p-2 border">{u.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => toggleStatus(u._id, u.status)}
                      className={`px-3 py-1 rounded text-white ${
                        u.status === "active"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {u.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>
    </>
  );
}
