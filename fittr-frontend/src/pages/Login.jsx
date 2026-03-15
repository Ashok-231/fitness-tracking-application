import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/gym-bg.png";
import "./Auth.css";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

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

  let role = user.role;

  if (Array.isArray(role)) {
    role = role[0];
  }

  if (role === "ADMIN" || role === "admin") {
    role = "ROLE_ADMIN";
  }

  const userId = user.userId || user.id;

  if (!userId) {
    throw new Error("User ID not returned from backend");
  }

  /* ================= SAVE LOGIN DATA ================= */

  localStorage.setItem("userId", userId);
  localStorage.setItem("role", role);
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));

  /* ================= REDIRECT ================= */

  if (role === "ROLE_ADMIN") {
    navigate("/admin");
  } else {
    navigate("/dashboard");
  }

} catch (err) {

  console.error(err);
  alert("Invalid email or password");

} finally {

  setLoading(false);

}


};

/* Handle form submit */
const handleSubmit = (e) => {
e.preventDefault();
handleLogin();
};

return (
<div
className="auth-container"
style={{ backgroundImage: `url(${bg})` }}
>


  <div className="auth-card">

    <h2>🏋 Fittr Login</h2>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ position: "relative" }}>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer"
          }}
        >
          👁
        </span>

      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    <div className="auth-link">
      Don’t have an account?
      <Link to="/register"> Register</Link>
    </div>

  </div>

</div>


);
}

export default Login;







