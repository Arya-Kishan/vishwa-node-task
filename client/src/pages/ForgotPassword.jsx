import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import {useNavigate} from "react-router-dom"

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (!form.email || !form.password || !form.confirmPassword) {
      setMessage("All fields are required!");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          newPassword: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Password reset successful!");
      setMessageType("success");
      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setMessage(err.message);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-teal-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Forgot Password Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-green-500/10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-gray-400 text-sm">Enter your email and new password</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border ${
              messageType === 'success' 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {messageType === 'success' ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
                <p className={`text-sm text-center ${
                  messageType === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <div>
            {/* Email Field */}
            <div className="relative group mb-4 sm:mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-gray-700/80 transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>

            {/* New Password Field */}
            <div className="relative group mb-4 sm:mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-gray-700/80 transition-all duration-300 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-green-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative group mb-4 sm:mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-gray-700/80 transition-all duration-300 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-green-400 transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Resetting Password...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Reset Password</span>
                </div>
              )}
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
            <p className="text-sm text-gray-400 text-center">
              Remembered your password?{" "}
              <button 
                onClick={() => {navigate("/login")}}
                className="text-green-400 hover:text-green-300 transition-colors duration-300 hover:underline bg-transparent border-none cursor-pointer font-medium"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-400 text-xs sm:text-sm">
            Your password will be securely updated
          </p>
        </div>
      </div>
    </div>
  );
}