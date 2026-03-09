import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      style={navbar}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🔥 Logo */}
      <div style={logo} onClick={() => navigate("/dashboard")}>
        🔥 Fittr
      </div>

      {/* 🔹 Navigation Buttons */}
      <div style={navRight}>
        <button
          style={isActive("/dashboard") ? activeBtn : navBtn}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          style={isActive("/profile") ? activeBtn : navBtn}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

        <button
          style={isActive("/goals") ? activeBtn : navBtn}
          onClick={() => navigate("/goals")}
        >
          Goals
        </button>

        <button
          style={isActive("/activities") ? activeBtn : navBtn}
          onClick={() => navigate("/activities")}
        >
          Activities
        </button>

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </motion.nav>
  );
}

/* ===============================
   STYLES
=============================== */

const navbar = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "rgba(15,23,42,0.85)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 20px rgba(56,189,248,0.25)"
};

const logo = {
  fontSize: 22,
  fontWeight: "bold",
  color: "#38bdf8",
  cursor: "pointer"
};

const navRight = {
  display: "flex",
  gap: 15
};

const navBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  padding: "8px 16px",
  borderRadius: 10,
  cursor: "pointer",
  transition: "0.3s"
};

const activeBtn = {
  ...navBtn,
  background: "#38bdf8",
  color: "#0f172a",
  fontWeight: "bold"
};

const logoutBtn = {
  background: "#38bdf8",
  border: "none",
  padding: "8px 16px",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer"
};

export default Navbar;