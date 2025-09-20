import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"; // logout icon

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user data
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.username || "User"} 🎉
        </h1>
        <p className="text-gray-600 mb-6">This is your dashboard.</p>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
