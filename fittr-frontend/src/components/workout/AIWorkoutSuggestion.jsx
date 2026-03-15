import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";

function AIWorkoutSuggestion({ userId }) {

const [goal, setGoal] = useState("");
const [bmi, setBmi] = useState(0);

useEffect(() => {


if (!userId) return;

getUser(userId)
  .then(res => {
    const user = res.data;
    setGoal(user.goal);
    setBmi(user.bmi || 0);
  })
  .catch(() => {});


}, [userId]);

/* ===============================
WORKOUT RECOMMENDATIONS
=============================== */

const workoutPlans = {


LOSE_WEIGHT: [
  "🏃 Running – 30 minutes",
  "🚶 Brisk Walking – 40 minutes",
  "🚴 Cycling – 25 minutes",
  "🔥 HIIT Workout – 20 minutes"
],

GAIN_MUSCLE: [
  "🏋️ Weight Training – 45 minutes",
  "💪 Push-ups – 4 sets",
  "🏋️ Squats – 4 sets",
  "🏋️ Bench Press – 4 sets"
],

STAY_FIT: [
  "🧘 Yoga – 30 minutes",
  "🚶 Walking – 30 minutes",
  "🏃 Light Jogging – 20 minutes",
  "🤸 Stretching – 15 minutes"
]


};

const workouts = workoutPlans[goal] || [];

return (


<div style={card}>

  <h3>🤖 AI Workout Recommendation</h3>

  <p>
    Goal: <b>{goal}</b>
  </p>

  <p>
    BMI: <b>{bmi}</b>
  </p>

  <ul style={{ marginTop: 10 }}>

    {workouts.map((w, i) => (
      <li key={i}>{w}</li>
    ))}

  </ul>

</div>


);

}

/* ===============================
STYLE
=============================== */

const card = {
marginTop: 30,
padding: 20,
borderRadius: 16,
background: "rgba(56,189,248,0.15)",
border: "1px solid rgba(56,189,248,0.3)",
boxShadow: "0 0 15px rgba(56,189,248,0.4)"
};

export default AIWorkoutSuggestion;
