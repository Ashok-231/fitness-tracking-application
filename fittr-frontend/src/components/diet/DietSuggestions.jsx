import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";

/* ===============================
   IMPORT LOCAL IMAGES
=============================== */

import oats from "../../assets/diet/oats.jpg";
import eggs from "../../assets/diet/eggs.jpg";
import salad from "../../assets/diet/salad.jpg";
import chicken from "../../assets/diet/chicken.jpg";
import soup from "../../assets/diet/soup.jpg";
import nuts from "../../assets/diet/nuts.jpg";
import fruits from "../../assets/diet/fruits.jpg";
import paneer from "../../assets/diet/paneer.jpg";

function DietSuggestions({ userId }) {

  const [goal, setGoal] = useState("");
  const [bmi, setBmi] = useState(0);
  const [weight, setWeight] = useState(0);

  /* ===============================
     LOAD USER DATA
  =============================== */

  useEffect(() => {

    if (!userId) return;

    getUser(userId)
      .then(res => {

        const user = res.data;

        setGoal(user.goal);
        setBmi(user.bmi || 0);
        setWeight(user.weight || 0);

      })
      .catch(()=>{});

  }, [userId]);

  /* ===============================
     AI RECOMMENDATION
  =============================== */

  const getRecommendedCalories = () => {

    if (goal === "LOSE_WEIGHT") return 1800;
    if (goal === "GAIN_MUSCLE") return 2600;
    if (goal === "STAY_FIT") return 2200;

    return 2000;

  };

  const getProtein = () => {

    if (!weight) return 0;

    if (goal === "GAIN_MUSCLE")
      return Math.round(weight * 1.8);

    if (goal === "LOSE_WEIGHT")
      return Math.round(weight * 1.4);

    return Math.round(weight * 1.2);

  };

  /* ===============================
     DIET PLANS
  =============================== */

  const dietPlans = {

    LOSE_WEIGHT: {

      breakfast: [
        { name: "Oats with fruits", image: oats, calories: 250 },
        { name: "Boiled eggs", image: eggs, calories: 150 }
      ],

      lunch: [
        { name: "Vegetable salad", image: salad, calories: 200 },
        { name: "Grilled chicken", image: chicken, calories: 300 }
      ],

      dinner: [
        { name: "Vegetable soup", image: soup, calories: 180 },
        { name: "Green tea", image: soup, calories: 20 }
      ]

    },

    GAIN_MUSCLE: {

      breakfast: [
        { name: "Fruit bowl", image: fruits, calories: 200 },
        { name: "Oats & milk", image: oats, calories: 300 }
      ],

      lunch: [
        { name: "Rice with chicken", image: chicken, calories: 500 },
        { name: "Paneer curry", image: paneer, calories: 400 }
      ],

      dinner: [
        { name: "Sweet potato", image: soup, calories: 250 },
        { name: "Mixed nuts", image: nuts, calories: 200 }
      ]

    },

    STAY_FIT: {

      breakfast: [
        { name: "Fruit bowl", image: fruits, calories: 200 },
        { name: "Oats & milk", image: oats, calories: 250 }
      ],

      lunch: [
        { name: "Vegetable salad", image: salad, calories: 220 },
        { name: "Paneer curry", image: paneer, calories: 350 }
      ],

      dinner: [
        { name: "Soup & salad", image: soup, calories: 200 },
        { name: "Nuts & seeds", image: nuts, calories: 180 }
      ]

    }

  };

  const plan = dietPlans[goal];

  if (!plan) {
    return <p>No diet suggestions available</p>;
  }

  /* ===============================
     TOTAL CALORIES
  =============================== */

  const totalCalories =
    [...plan.breakfast, ...plan.lunch, ...plan.dinner]
      .reduce((sum, item) => sum + item.calories, 0);

  /* ===============================
     SECTION RENDER
  =============================== */

  const renderSection = (title, foods) => (

    <div style={{ marginBottom: 40 }}>

      <h2>{title}</h2>

      <div style={grid}>

        {foods.map((item, i) => (

          <div key={i} style={card}>

            <img
              src={item.image}
              alt={item.name}
              style={image}
            />

            <h4>{item.name}</h4>

            <p style={calorieText}>
              🔥 {item.calories} kcal
            </p>

          </div>

        ))}

      </div>

    </div>

  );

  /* ===============================
     UI
  =============================== */

  return (

    <div>

      <h2 style={{ marginBottom: 10 }}>
        🥗 Diet Plan
      </h2>

      <p style={{ marginBottom: 30 }}>
        Goal: <b>{goal}</b>
      </p>

      {/* AI Recommendation */}

      <div style={aiCard}>

        <h3>🤖 Smart Diet Recommendation</h3>

        <p>BMI: <b>{bmi}</b></p>

        <p>
          Recommended Daily Calories:
          <b> {getRecommendedCalories()} kcal</b>
        </p>

        <p>
          Recommended Protein Intake:
          <b> {getProtein()} g/day</b>
        </p>

      </div>

      {renderSection("🍳 Breakfast", plan.breakfast)}
      {renderSection("🍛 Lunch", plan.lunch)}
      {renderSection("🍲 Dinner", plan.dinner)}

      <div style={totalCard}>
        🔥 Total Daily Calories: <b>{totalCalories} kcal</b>
      </div>

    </div>

  );

}

/* ===============================
   STYLES
=============================== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px"
};

const card = {
  background: "rgba(15,23,42,0.6)",
  padding: "12px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 20px rgba(56,189,248,0.25)"
};

const image = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const calorieText = {
  color: "#38bdf8",
  fontWeight: "bold"
};

const totalCard = {
  marginTop: 20,
  padding: 15,
  borderRadius: 12,
  background: "rgba(56,189,248,0.15)",
  border: "1px solid rgba(56,189,248,0.3)",
  fontSize: "18px"
};

const aiCard = {
  marginBottom: 30,
  padding: 20,
  borderRadius: 14,
  background: "rgba(56,189,248,0.15)",
  border: "1px solid rgba(56,189,248,0.3)",
  boxShadow: "0 0 15px rgba(56,189,248,0.4)"
};

export default DietSuggestions;