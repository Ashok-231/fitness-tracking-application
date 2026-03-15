import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUser } from "../../services/userService";

function UserProfileCard({ userId }) {

const [user, setUser] = useState(null);

useEffect(() => {

if (!userId) return;

getUser(userId)
  .then(res => setUser(res.data))
  .catch(() => {});


}, [userId]);

if (!user) {
return <p style={{opacity:0.6}}>Loading profile...</p>;
}

const age = user.dob
? new Date().getFullYear() - new Date(user.dob).getFullYear()
: "—";

const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

return (

<motion.div
  style={card}
  initial={{opacity:0,y:20}}
  animate={{opacity:1,y:0}}
>

  {/* AVATAR */}

  <div style={header}>

    <div style={avatar}>
      {initial}
    </div>

    <div>
      <h3 style={{margin:0}}>
        {user.name || "User"}
      </h3>

      <p style={email}>
        {user.email}
      </p>
    </div>

  </div>

  {/* INFO GRID */}

  <div style={infoGrid}>

    <Info label="Gender" value={user.gender || "—"} />
    <Info label="Age" value={age} />
    <Info label="Goal" value={user.goal || "—"} />

  </div>

  {/* EDIT BUTTON */}

  <button style={editBtn}>
    ✏ Edit Profile
  </button>

</motion.div>


);

}

/* INFO ITEM */

const Info = ({label,value}) => (

  <div style={infoBox}>
    <p style={labelStyle}>{label}</p>
    <p style={valueStyle}>{value}</p>
  </div>

);

/* ===============================
STYLES
=============================== */

const card={
padding:20,
borderRadius:18,
background:"rgba(15,23,42,0.6)",
border:"1px solid rgba(255,255,255,0.08)",
boxShadow:"0 0 25px rgba(56,189,248,0.25)"
};

const header={
display:"flex",
alignItems:"center",
gap:"14px",
marginBottom:"18px"
};

const avatar={
width:"60px",
height:"60px",
borderRadius:"50%",
background:"#38bdf8",
color:"#020617",
fontSize:"24px",
fontWeight:"bold",
display:"flex",
alignItems:"center",
justifyContent:"center"
};

const email={
opacity:0.6,
fontSize:"14px",
margin:0
};

const infoGrid={
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"12px",
marginBottom:"18px"
};

const infoBox={
background:"rgba(255,255,255,0.04)",
padding:"10px",
borderRadius:"10px"
};

const labelStyle={
fontSize:"12px",
opacity:0.6,
margin:0
};

const valueStyle={
fontWeight:"bold",
margin:0
};

const editBtn={
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"none",
background:"#38bdf8",
color:"#020617",
fontWeight:"bold",
cursor:"pointer"
};

export default UserProfileCard;
