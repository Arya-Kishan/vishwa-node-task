// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* If logged in → Dashboard */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
