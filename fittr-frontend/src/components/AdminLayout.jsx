import { FaUsers, FaChartLine, FaFire, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {

const navigate = useNavigate();

const logout = () => {
localStorage.clear();
navigate("/login");
};

return (
<div style={{ display: "flex", minHeight: "100vh" }}>

  {/* Sidebar */}
  <div style={{
    width: 220,
    background: "#020617",
    color: "white",
    padding: 20
  }}>
    <h2 style={{ marginBottom: 30 }}>Fittr Admin</h2>

    <div style={menuItem}>
      <FaChartLine /> Dashboard
    </div>

    <div style={menuItem}>
      <FaUsers /> Users
    </div>

    <div style={menuItem}>
      <FaFire /> Activities
    </div>

    <div style={menuItem} onClick={logout}>
      <FaSignOutAlt /> Logout
    </div>

  </div>

  {/* Main Content */}
  <div style={{
    flex: 1,
    background: "#0f172a",
    padding: 30,
    color: "white"
  }}>
    {children}
  </div>

</div>


);
}

const menuItem = {
display: "flex",
gap: 10,
marginBottom: 20,
cursor: "pointer"
};

export default AdminLayout;
