import { useState } from "react";
import { addGoal } from "../../services/goalService";

const AddGoal = ({ userId, refreshGoals }) => {
  const [activityName, setActivityName] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [goalType, setGoalType] = useState("CALORIES");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not logged in");

    // 🛠 Convert date to ISO format for Spring Boot (yyyy-MM-dd)
    const formattedDate = new Date(targetDate).toISOString().split("T")[0];

    const goal = {
      activityName,
      targetValue: Number(targetValue),
      targetDate: formattedDate,
      goalType
    };

    try {
      setLoading(true);
      await addGoal(userId, goal);
      refreshGoals();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);

      setActivityName("");
      setTargetValue("");
      setTargetDate("");
      setGoalType("CALORIES");
    } catch (err) {
      console.error("Save goal failed:", err);
      setError(true);
      setTimeout(() => setError(false), 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={error ? "shake" : ""}
      style={form}
    >
      <h3>🎯 Add Goal</h3>

      <input
        style={input}
        type="text"
        placeholder="Activity (Running, Gym, Yoga...)"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        required
      />

      <input
        style={input}
        type="number"
        placeholder="Target Value"
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
        required
      />

      <select
        value={goalType}
        onChange={(e) => setGoalType(e.target.value)}
        style={input}
      >
        <option value="CALORIES">🔥 Calories</option>
        <option value="DURATION">⏱ Minutes</option>
      </select>

      {/* 🗓️ Date picker fixed for dark UI */}
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        required
        style={{
          ...input,
          colorScheme: "dark",
          cursor: "pointer"
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className={`glow-hover press ${success ? "success" : ""}`}
        style={button}
      >
        {loading ? "Saving..." : "Save Goal"}
      </button>
    </form>
  );
};

/* Glass Styles */
const form = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  borderRadius: 18,
  background: "rgba(15,23,42,0.55)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const input = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(2,6,23,0.7)",
  color: "#fff",
  outline: "none"
};

const button = {
  marginTop: 10,
  padding: "10px",
  borderRadius: 12,
  background: "#38bdf8",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer"
};

export default AddGoal;



