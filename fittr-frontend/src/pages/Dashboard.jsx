import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";

import ActivityList from "../components/activity/ActivityList";
import UserProfileCard from "../components/profile/UserProfileCard";

import FitnessCharts from "../components/charts/FitnessCharts";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";
import AIWorkoutSuggestion from "../components/workout/AIWorkoutSuggestion";

import { getActivities } from "../services/activityService";

import {
StatSkeleton,
SectionSkeleton,
ListSkeleton
} from "../components/Skeletons";

function Dashboard() {

const [userId, setUserId] = useState(null);
const [activities, setActivities] = useState([]);
const [totalDuration, setTotalDuration] = useState(0);
const [totalCalories, setTotalCalories] = useState(0);
const [loading, setLoading] = useState(true);

/* ================= AUTH ================= */

useEffect(() => {

const id = localStorage.getItem("userId");

if (!id) {
  window.location.href = "/";
  return;
}

setUserId(Number(id));

}, []);

/* ================= TOTALS ================= */

const calculateTotals = (data) => {

let minutes = 0;
let calories = 0;

data.forEach(a => {
  minutes += Number(a.duration || 0);
  calories += Number(a.calories || 0);
});

setTotalDuration(minutes);
setTotalCalories(calories);

};

/* ================= LOAD ACTIVITIES ================= */

const loadActivities = useCallback(async () => {

try {

  if (!userId) return;

  const res = await getActivities(userId);
  const data = Array.isArray(res.data) ? res.data : [];

  setActivities(data);
  calculateTotals(data);

} catch (error) {

  console.error("Activities load failed", error);
  setActivities([]);

} finally {

  setLoading(false);

}

}, [userId]);

useEffect(() => {


if (userId) {
  loadActivities();
}

}, [userId, loadActivities]);

/* ================= LOADING ================= */

if (!userId || loading) {


return (
  <Layout>
    <div style={{ padding: 30 }}>

      <div style={statsGrid}>
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      <div style={loadingGrid}>
        <SectionSkeleton />
        <SectionSkeleton />
      </div>

      <div style={{ marginTop: 30 }}>
        <ListSkeleton />
      </div>

    </div>
  </Layout>
);

}

/* ================= UI ================= */

return (

<Layout>
  <FittrTheme>

    <motion.div
      style={page}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* HEADER */}

      <div style={hero}>
        <h1>🔥 Fittr Dashboard</h1>

        <p style={{ opacity: 0.7 }}>
          <b>All Time:</b> {totalCalories} kcal • {totalDuration} mins
        </p>
      </div>

      {/* STATS */}

      <div style={statsGrid}>

        <StatCard
          title="Total Calories"
          value={`${totalCalories} kcal`}
        />

        <StatCard
          title="Total Duration"
          value={`${totalDuration} min`}
        />

        <StatCard
          title="Total Activities"
          value={activities.length}
        />

      </div>

      {/* MAIN GRID */}

      <div style={mainGrid}>

        {/* LEFT SIDE */}

        <div>

          

          
          <AIWorkoutSuggestion userId={userId} />

        </div>

        {/* RIGHT SIDE */}

        <div>

          <Section title="👤 Profile Overview">
            <UserProfileCard userId={userId} />
          </Section>
         

        </div>

      </div>

    </motion.div>

  </FittrTheme>
</Layout>

);
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value }) => (

<motion.div
style={statCard}
whileHover={{ scale: 1.05 }}

>

<p style={{ opacity: 0.7 }}>{title}</p>

<h2 style={{ color: "#38bdf8" }}>
  {value}
</h2>

</motion.div>

);

const Section = ({ title, children }) => (

<motion.div
style={section}
whileHover={{ y: -3 }}

>

<h3 style={{ marginBottom: 15 }}>
  {title}
</h3>

{children}


</motion.div>

);

/* ================= STYLES ================= */

const page = {
padding: "20px"
};

const hero = {
marginBottom: 30
};

const statsGrid = {
display: "grid",
gridTemplateColumns: "repeat(3,1fr)",
gap: 20,
marginBottom: 30
};

const loadingGrid = {
display: "grid",
gridTemplateColumns: "2fr 1fr",
gap: 30,
marginTop: 30
};

const statCard = {
background: "linear-gradient(145deg,#1e293b,#020617)",
border: "1px solid rgba(56,189,248,0.2)",
boxShadow: "0 0 20px rgba(56,189,248,0.25)",
borderRadius: 18,
padding: 22,
textAlign: "center"
};

const mainGrid = {
display: "grid",
gridTemplateColumns: "2fr 1fr",
gap: 30
};

const section = {
background: "rgba(15,23,42,0.65)",
backdropFilter: "blur(10px)",
border: "1px solid rgba(255,255,255,0.05)",
borderRadius: 18,
padding: 22,
marginBottom: 22,
boxShadow: "0 0 18px rgba(0,0,0,0.35)"
};

export default Dashboard;

