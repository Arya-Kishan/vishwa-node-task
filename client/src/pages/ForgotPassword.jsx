import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      setMessage("❌ All fields are required!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          newPassword: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("✅ Password reset successful!");
      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {message && (
          <p className="text-sm text-center mb-4 text-gray-700">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showConfirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-center mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}