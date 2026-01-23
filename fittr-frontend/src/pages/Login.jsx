import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/gym-bg.png";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      const user = res.data;

      /* ===============================
         🔐 NORMALIZE ROLE (🔥 FIX)
      =============================== */
      let role = user.role;

      // Handle array roles
      if (Array.isArray(role)) {
        role = role[0];
      }

      // Normalize admin role
      if (role === "ADMIN" || role === "admin") {
        role = "ROLE_ADMIN";
      }

      /* ===============================
         🔐 STORE AUTH DATA
      =============================== */
      localStorage.setItem("userId", user.userId ?? user.id);
      localStorage.setItem("role", role);
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      /* ===============================
         🔁 REDIRECT (🔥 FIX)
      =============================== */
      if (role === "ROLE_ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="auth-card">
        <h2>🏋 Fittr Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
















