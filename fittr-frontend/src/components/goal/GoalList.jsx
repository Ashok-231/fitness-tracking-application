import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deleteGoal, getGoalProgress } from "../../services/goalService";

const GoalList = ({ goals = [], refreshGoals }) => {
  const [progress, setProgress] = useState({});
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (goals.length === 0) {
      setProgress({});
      return;
    }

    goals.forEach(goal => {
      getGoalProgress(goal.id)
        .then(res => {
          setProgress(prev => ({
            ...prev,
            [goal.id]: res.data || 0
          }));
        })
        .catch(() => {
          setProgress(prev => ({
            ...prev,
            [goal.id]: 0
          }));
        });
    });
  }, [goals]);

  const handleDelete = async (id) => {
    setDeleting(id);
    await deleteGoal(id);
    refreshGoals();
    setDeleting(null);
  };

  return (
    <div>
      <h3>🎯 Your Goals</h3>

      {goals.length === 0 && (
        <p style={{ opacity: 0.7 }}>No goals found</p>
      )}

      {goals.map(g => {
        const p = progress[g.id] || 0;
        const achieved = p >= 100;

        return (
          <motion.div
            key={g.id}
            style={card}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* ✅ Correct fields */}
            <h4>{g.activityName}</h4>
            <p>Target: {g.targetValue}</p>
            <p>Deadline: {g.targetDate}</p>

            {/* Progress Bar */}
            <div style={barWrap}>
              <motion.div
                style={{
                  ...bar,
                  width: `${p}%`,
                  background: achieved ? "#22c55e" : "#38bdf8"
                }}
                animate={{ width: `${p}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p style={{ marginTop: 6 }}>{p.toFixed(1)}%</p>

            {achieved && (
              <motion.p
                style={achievedText}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                🏆 Goal Achieved!
              </motion.p>
            )}

            <button
              onClick={() => handleDelete(g.id)}
              className={`press glow-hover ${deleting === g.id ? "shake" : ""}`}
              style={deleteBtn}
            >
              {deleting === g.id ? "Deleting..." : "❌ Delete"}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

/* Glass UI */
const card = {
  marginBottom: 20,
  padding: 18,
  borderRadius: 18,
  background: "rgba(15,23,42,0.55)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 0 20px rgba(56,189,248,0.25)"
};

const barWrap = {
  height: 10,
  background: "rgba(255,255,255,0.1)",
  borderRadius: 10,
  overflow: "hidden"
};

const bar = {
  height: "100%",
  borderRadius: 10
};

const achievedText = {
  color: "#22c55e",
  fontWeight: "bold"
};

const deleteBtn = {
  marginTop: 10,
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer"
};

export default GoalList;


