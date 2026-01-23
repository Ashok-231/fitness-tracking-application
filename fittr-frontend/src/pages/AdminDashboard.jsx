import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ===============================
   ADMIN DASHBOARD
=============================== */
function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ROLE_ADMIN") {
          navigate("/login");
          return;
        }

        const statsRes = await axios.get(
          "http://localhost:8080/api/admin/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const usersRes = await axios.get(
          "http://localhost:8080/api/admin/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/admin/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: 30 }}>Loading...</p>;
  if (!stats) return <p style={{ padding: 30 }}>No data</p>;

  return (
    <div style={page}>
      <button onClick={handleLogout} style={logoutBtn}>Logout</button>

      <h1>🛡️ Admin Dashboard</h1>
      <p style={{ opacity: 0.7 }}>System-wide analytics overview</p>

      {/* 📊 STATS */}
      <div style={grid}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Admin Users" value={stats.adminUsers} />
        <StatCard title="Total Activities" value={stats.totalActivities} />
        <StatCard title="Total Calories Burned" value={stats.totalCalories} />
      </div>

      {/* 👥 USERS */}
      <motion.div style={userSection}>
        <h2>👥 Registered Users</h2>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Name</th>
              <th style={{ ...th, textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" style={emptyRow}>No users found</td>
              </tr>
            ) : (
              filteredUsers.map((u, index) => (
                <tr key={u.id}>
                  <td style={td}>{index + 1}</td>
                  <td style={td}>{u.name}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

/* ===============================
   STAT CARD
=============================== */
const StatCard = ({ title, value }) => (
  <motion.div style={card} whileHover={{ scale: 1.05 }}>
    <p style={{ opacity: 0.7 }}>{title}</p>
    <h2 style={{ color: "#38bdf8" }}>{value}</h2>
  </motion.div>
);

/* ===============================
   STYLES
=============================== */
const page = {
  padding: 30,
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #020617, #000)",
  color: "#e5f2ff",
  position: "relative"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginTop: 30
};

const card = {
  background: "rgba(15,23,42,0.6)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  padding: 20,
  textAlign: "center",
  boxShadow: "0 0 25px rgba(56,189,248,0.35)"
};

const userSection = {
  marginTop: 50,
  padding: 25,
  background: "rgba(15,23,42,0.55)",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 20px rgba(56,189,248,0.25)"
};

const table = {
  width: "100%",
  marginTop: 20,
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid rgba(255,255,255,0.2)"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const emptyRow = {
  padding: 20,
  textAlign: "center",
  opacity: 0.6
};

const searchBox = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 8,
  border: "none",
  outline: "none"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer"
};

const logoutBtn = {
  position: "absolute",
  top: 20,
  right: 30,
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default AdminDashboard;
