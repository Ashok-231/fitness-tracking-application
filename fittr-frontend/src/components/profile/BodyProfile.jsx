import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { saveBody, getUser } from "../../services/userService";

function BodyProfile() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const userId = localStorage.getItem("userId");
  const todayCalories = Number(localStorage.getItem("todayCalories") || 0);

  /* ===============================
     Load saved body profile
  =============================== */
  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        const res = await getUser(userId);
        const user = res.data;

        setHeight(user.height || "");
        setWeight(user.weight || "");
        setBmi(user.bmi || 0);
      } catch (err) {
        console.error("No body profile yet");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  /* ===============================
     Live BMI
  =============================== */
  useEffect(() => {
    if (height && weight) {
      const h = height / 100;
      const bmiValue = weight / (h * h);
      setBmi(Number(bmiValue.toFixed(1)));
    } else {
      setBmi(0);
    }
  }, [height, weight]);

  /* ===============================
     Save body profile
  =============================== */
  const save = async () => {
    if (!userId) return alert("User not logged in");

    if (height < 50 || height > 300) {
      return alert("Enter valid height (50–300 cm)");
    }
    if (weight < 10 || weight > 300) {
      return alert("Enter valid weight (10–300 kg)");
    }

    try {
      setSaving(true);

      await saveBody(userId, {
        height: Number(height),
        weight: Number(weight),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1200);
    } catch (err) {
      console.error(err);
      setError(true);
      setTimeout(() => setError(false), 600);
    } finally {
      setSaving(false);
    }
  };

  /* ===============================
     BMI color & tips
  =============================== */
  const bmiColor =
    bmi < 18.5 ? "#facc15" :
    bmi < 25 ? "#22c55e" :
    bmi < 30 ? "#fb923c" :
    "#ef4444";

  const getBmiTip = () => {
    if (bmi === 0) return "Enter height & weight to get health tips.";
    if (bmi < 18.5) return "🟡 Underweight. Increase protein & strength training.";
    if (bmi < 25) return "🟢 Healthy BMI. Maintain your routine!";
    if (bmi < 30) return "🟠 Overweight. Try cardio & reduce sugar.";
    return "🔴 High BMI. Start walking, yoga & portion control.";
  };

  const getActivityTip = () => {
    if (todayCalories === 0) return "⚠️ No workout today. Try a 15-minute walk.";
    if (todayCalories < 200) return "🙂 Good start! Keep moving.";
    if (todayCalories < 500) return "💪 Great job! Strong activity today.";
    return "🔥 Excellent! You’re on fire today!";
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", color: "#38bdf8" }}>
        Loading body profile...
      </div>
    );
  }

  return (
    <motion.div
      style={card}
      className={error ? "shake" : ""}
      animate={success ? { boxShadow: "0 0 40px #22c55e" } : {}}
    >
      <h3>🧍 Body Profile</h3>

      <input
        style={input}
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <input
        style={input}
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <motion.p
        style={{ marginTop: 10, fontWeight: "bold", color: bmiColor }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
      >
        BMI: {bmi}
      </motion.p>

      <div style={tipBox}>
        <p>{getBmiTip()}</p>
        <p style={{ marginTop: 6 }}>{getActivityTip()}</p>
      </div>

      <button
        onClick={save}
        disabled={saving || !height || !weight}
        style={btn}
      >
        {saving ? "Saving..." : "Save Body Data"}
      </button>
    </motion.div>
  );
}

/* ===============================
   Styles
=============================== */

const card = {
  marginTop: 20,
  padding: 20,
  borderRadius: 20,
  background: "rgba(15,23,42,0.55)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 30px rgba(56,189,248,0.3)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(2,6,23,0.8)",
  color: "#fff",
  marginBottom: 10,
  outline: "none",
};

const btn = {
  marginTop: 12,
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  background: "#38bdf8",
  fontWeight: "bold",
  cursor: "pointer",
};

const tipBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 12,
  background: "rgba(56,189,248,0.15)",
  border: "1px solid rgba(56,189,248,0.3)",
  color: "#38bdf8",
  fontSize: "14px",
};

export default BodyProfile;





