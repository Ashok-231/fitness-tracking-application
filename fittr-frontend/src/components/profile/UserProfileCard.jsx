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
    return <p style={{ opacity: 0.6 }}>Loading profile...</p>;
  }

  const age = user.dob
    ? new Date().getFullYear() - new Date(user.dob).getFullYear()
    : "—";

  return (
    <motion.div
      style={card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p><b>Name:</b> {user.name || "—"}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Gender:</b> {user.gender || "—"}</p>
      <p><b>Age:</b> {age}</p>
      <p><b>Goal:</b> {user.goal || "—"}</p>
    </motion.div>
  );
}

const card = {
  padding: 16,
  borderRadius: 14,
  background: "rgba(15,23,42,0.6)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 20px rgba(56,189,248,0.25)",
  lineHeight: "1.8"
};

export default UserProfileCard; // 🔥 THIS LINE IS CRITICAL
