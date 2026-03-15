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
import WorkoutVideos from "./pages/WorkoutVideos";
import Diet from "./pages/Diet";
import DailySummary from "./pages/DailySummary";
import WeeklyProgress from "./pages/WeeklyProgress";
import Analytics from "./pages/Analytics";

/* ===============================
🔐 USER PROTECTED ROUTE
=============================== */

const PrivateRoute = ({ children }) => {

const token = localStorage.getItem("token");

if (!token) {
return <Navigate to="/" replace />;
}

return children;
};

/* ===============================
🛡️ ADMIN PROTECTED ROUTE
=============================== */

const AdminRoute = ({ children }) => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {
return <Navigate to="/" replace />;
}

if (role !== "ROLE_ADMIN") {
return <Navigate to="/dashboard" replace />;
}

return children;
};

function App() {

return (

<BrowserRouter>

  <Routes>

    {/* ================= PUBLIC ROUTES ================= */}

    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* ================= USER ROUTES ================= */}

    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />

    <Route
      path="/goals"
      element={
        <PrivateRoute>
          <Goals />
        </PrivateRoute>
      }
    />

    <Route
      path="/activities"
      element={
        <PrivateRoute>
          <Activities />
        </PrivateRoute>
      }
    />

    <Route
      path="/workout"
      element={
        <PrivateRoute>
          <Workout />
        </PrivateRoute>
      }
    />

    {/* 🎥 WORKOUT VIDEOS */}

    <Route
      path="/workout-videos"
      element={
        <PrivateRoute>
          <WorkoutVideos />
        </PrivateRoute>
      }
    />
    <Route
  path="/diet"
  element={
    <PrivateRoute>
      <Diet />
    </PrivateRoute>
  }
/>

    <Route
      path="/daily"
      element={
        <PrivateRoute>
          <DailySummary />
        </PrivateRoute>
      }
    />

    <Route
      path="/weekly"
      element={
        <PrivateRoute>
          <WeeklyProgress />
        </PrivateRoute>
      }
    />

    <Route
      path="/analytics"
      element={
        <PrivateRoute>
          <Analytics />
        </PrivateRoute>
      }
    />

    {/* ================= ADMIN ================= */}

    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />

    {/* ================= FALLBACK ================= */}

    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>

</BrowserRouter>


);

}

export default App;











