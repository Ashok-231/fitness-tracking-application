import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaUser,
  FaBullseye,
  FaRunning,
  FaDumbbell,
  FaCalendarDay,
  FaChartLine,
  FaChartPie,
  FaSignOutAlt
} from "react-icons/fa";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Goals", path: "/goals", icon: <FaBullseye /> },
    { name: "Activities", path: "/activities", icon: <FaRunning /> },
    { name: "Workout", path: "/workout", icon: <FaDumbbell /> },
    { name: "Daily Summary", path: "/daily", icon: <FaCalendarDay /> },
    { name: "Weekly Progress", path: "/weekly", icon: <FaChartLine /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartPie /> }   // ✅ NEW
  ];

  return (
    <div style={container}>
      {/* SIDEBAR */}
      <motion.div
        style={sidebar}
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={logo}>🔥 Fittr</h2>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} style={{ position: "relative" }}>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  style={activeIndicator}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <button
                style={navBtn}
                onClick={() => navigate(item.path)}
              >
                <span style={icon}>{item.icon}</span>
                {item.name}
              </button>
            </div>
          );
        })}

        <button style={logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </motion.div>

      {/* CONTENT AREA */}
      <div style={content}>{children}</div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "#0f172a",
  color: "white"
};

const sidebar = {
  width: "270px",
  padding: "30px 20px",
  background: "rgba(15,23,42,0.95)",
  borderRight: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  position: "relative"
};

const logo = {
  color: "#38bdf8",
  marginBottom: "25px",
  fontSize: "22px"
};

const navBtn = {
  width: "100%",
  background: "transparent",
  border: "none",
  color: "white",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  position: "relative",
  zIndex: 2,
  transition: "0.3s"
};

const icon = {
  fontSize: "16px"
};

const activeIndicator = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "100%",
  borderRadius: "10px",
  background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
  boxShadow: "0 0 15px rgba(56,189,248,0.6)",
  zIndex: 1
};

const logoutBtn = {
  marginTop: "auto",
  background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0f172a",
  gap: "8px"
};

const content = {
  flex: 1,
  padding: "40px"
};

export default Layout;