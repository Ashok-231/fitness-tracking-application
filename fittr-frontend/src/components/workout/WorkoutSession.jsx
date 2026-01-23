import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function WorkoutSession({ userId, refresh }) {
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const [activity, setActivity] = useState("Running");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const timerRef = useRef(null);

  // calories per minute
  const calorieRate = {
    Running: 12,
    Walking: 5,
    Yoga: 4,
    Gym: 8
  };

  /* ===============================
     START TIMER
  =============================== */
  const start = () => {
    if (running) return;
    setRunning(true);

    const startTime = Date.now() - time;
    timerRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 100); // 100ms is enough
  };

  /* ===============================
     STOP & SAVE (FIXED)
  =============================== */
  const stopAndSave = async () => {
    clearInterval(timerRef.current);
    setRunning(false);

    const minutesRaw = time / 60000;

    // 🚫 Ignore accidental clicks (< 30 seconds)
    if (minutesRaw < 0.5) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    // ✅ ALWAYS save at least 1 minute
    const minutes = Math.max(1, Math.ceil(minutesRaw));
    const calories = minutes * calorieRate[activity];

    try {
      setSaving(true);

      await axios.post(
        `http://localhost:8080/api/activities/user/${userId}`,
        {
          name: activity,
          duration: minutes, // ✅ STORE MINUTES (INTEGER)
          calories,
          date: new Date().toISOString().split("T")[0],
          category: "General"
        }
      );

      refresh();      // 🔄 refresh dashboard
      setTime(0);     // reset timer
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);

    } catch (err) {
      console.error("Save failed", err);
      setError(true);
      setTimeout(() => setError(false), 600);
    } finally {
      setSaving(false);
    }
  };

  /* ===============================
     RESET
  =============================== */
  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
  };

  /* ===============================
     FORMAT TIMER
  =============================== */
  const formatTime = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milli).padStart(2, "0")}`;
  };

  return (
    <motion.div
      style={card}
      className={error ? "shake" : ""}
      animate={success ? { boxShadow: "0 0 40px #22c55e" } : {}}
    >
      <h3>🏋️ Smart Workout Tracker</h3>

      <motion.div
        style={timerStyle}
        animate={running ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {formatTime(time)}
      </motion.div>

      <div style={{ marginBottom: 15 }}>
        <button style={btn} onClick={start}>
          Start
        </button>

        <button style={btn} onClick={stopAndSave}>
          {saving ? "Saving..." : "Stop & Save"}
        </button>

        <button style={btn} onClick={reset}>
          Reset
        </button>
      </div>

      <motion.select
        value={activity}
        onChange={e => setActivity(e.target.value)}
        style={select}
        whileHover={{ scale: 1.05 }}
      >
        <option>Running</option>
        <option>Walking</option>
        <option>Yoga</option>
        <option>Gym</option>
      </motion.select>
    </motion.div>
  );
}

/* ===============================
   STYLES
=============================== */

const card = {
  background: "rgba(15,23,42,0.6)",
  backdropFilter: "blur(18px)",
  color: "white",
  padding: "25px",
  borderRadius: "20px",
  maxWidth: "400px",
  margin: "auto",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 30px rgba(56,189,248,0.3)",
  textAlign: "center"
};

const timerStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  margin: "20px 0",
  fontFamily: "monospace",
  color: "#38bdf8"
};

const btn = {
  padding: "10px 20px",
  margin: "0 6px",
  borderRadius: "12px",
  border: "none",
  background: "#38bdf8",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer"
};

const select = {
  padding: "10px",
  borderRadius: "12px",
  border: "none",
  width: "100%",
  fontSize: "16px",
  marginTop: 10,
  background: "rgba(2,6,23,0.8)",
  color: "#fff"
};



