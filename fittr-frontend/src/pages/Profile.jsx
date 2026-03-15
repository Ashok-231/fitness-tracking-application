import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import UserProfileCard from "../components/profile/UserProfileCard";
import BodyProfile from "../components/profile/BodyProfile";

function Profile() {

const userId = localStorage.getItem("userId");

return (

<Layout>
  <FittrTheme>

    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <h1>👤 Profile</h1>
        <p style={subtitle}>
          Manage your personal and body information
        </p>
      </div>

      {/* MAIN GRID */}
      <div style={grid}>

        {/* USER PROFILE */}
        <div style={card}>
          <UserProfileCard userId={userId} />
        </div>

        {/* BODY PROFILE */}
        <div style={card}>
          <BodyProfile userId={userId} />
        </div>

      </div>

    </div>

  </FittrTheme>
</Layout>


);

}

/* ===============================
STYLES
=============================== */

const page = {
padding: "20px"
};

const header = {
marginBottom: "25px"
};

const subtitle = {
opacity: 0.6,
fontSize: "14px"
};

const grid = {
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "25px"
};

const card = {
background: "rgba(15,23,42,0.65)",
backdropFilter: "blur(10px)",
borderRadius: "18px",
border: "1px solid rgba(255,255,255,0.05)",
padding: "20px",
boxShadow: "0 0 20px rgba(0,0,0,0.3)"
};

export default Profile;
