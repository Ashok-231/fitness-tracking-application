import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/Profile";
import Goals from "./pages/Goals";
import Activities from "./pages/Activities";
import Workout from "./pages/Workout";
import DailySummary from "./pages/DailySummary";
import WeeklyProgress from "./pages/WeeklyProgress";
import Analytics from "./pages/Analytics";   // ✅ NEW

/* ===============================
   🔐 USER PROTECTED ROUTE
=============================== */
const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/" replace />;
};

/* ===============================
   🛡️ ADMIN PROTECTED ROUTE
=============================== */
const AdminRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  if (!userId) return <Navigate to="/" replace />;
  if (role === "ROLE_ADMIN") return children;

  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 User Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />

        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />

        <Route
          path="/goals"
          element={<PrivateRoute><Goals /></PrivateRoute>}
        />

        <Route
          path="/activities"
          element={<PrivateRoute><Activities /></PrivateRoute>}
        />

        <Route
          path="/workout"
          element={<PrivateRoute><Workout /></PrivateRoute>}
        />

        <Route
          path="/daily"
          element={<PrivateRoute><DailySummary /></PrivateRoute>}
        />

        <Route
          path="/weekly"
          element={<PrivateRoute><WeeklyProgress /></PrivateRoute>}
        />

        {/* ✅ ANALYTICS PAGE */}
        <Route
          path="/analytics"
          element={<PrivateRoute><Analytics /></PrivateRoute>}
        />

        {/* 🛡️ Admin */}
        <Route
          path="/admin"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;









