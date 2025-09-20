import React from "react";
import { LogOut, User } from "lucide-react";
import {useNavigate} from "react-router-dom"

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user data
    navigate("/login"); // redirect to login page - would be handled by router
    console.log("User logged out, redirecting to login...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Dashboard Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-blue-500/10">
          {/* User Avatar */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome, {user?.username || "User"}! 
            <span className="ml-2">🎉</span>
          </h1>
          
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            This is your dashboard.
          </p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 mx-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-400 text-xs sm:text-sm">
            Welcome to your secure dashboard
          </p>
        </div>
      </div>
    </div>
  );
}