import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  // ✅ Redirect if user exists in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate("/"); // go to dashboard
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("user", JSON.stringify(form));
      setUser(form);
      navigate("/"); // go to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-500 mt-6">
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create Account
          </Link>
          <Link to="/forget-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}