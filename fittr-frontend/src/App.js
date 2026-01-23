import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

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

  // Not logged in
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  // Admin check (robust)
  if (role === "ROLE_ADMIN") {
    return children;
  }

  // Logged in but not admin
  return <Navigate to="/dashboard" replace />;
};

/* ===============================
   🚀 APP
=============================== */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 User */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🛡️ Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;









