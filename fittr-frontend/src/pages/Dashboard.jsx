import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import ActivityList from "../components/activity/ActivityList";
import AddGoal from "../components/goal/AddGoal";
import GoalList from "../components/goal/GoalList";
import CategoryList from "../components/category/CategoryList";
import DailyProgress from "../components/progress/DailyProgress";
import WorkoutSession from "../components/workout/WorkoutSession";
import BodyProfile from "../components/profile/BodyProfile";
import UserProfileCard from "../components/profile/UserProfileCard";

import { getActivities } from "../services/activityService";
import { getGoals } from "../services/goalService";
import FitnessCharts from "../components/charts/FitnessCharts";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";
import FittrTheme from "../theme/FittrTheme";
import { StatSkeleton, SectionSkeleton, ListSkeleton } from "../components/Skeletons";

function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0); // ✅ minutes (INT)
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ===============================
     AUTH
  =============================== */
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) window.location.href = "/";
    else setUserId(Number(id));
  }, []);

  /* ===============================
     CALCULATE TOTALS (ALL TIME)
     duration is ALREADY in minutes
  =============================== */
  const calculateTotals = (data) => {
    let minutes = 0;
    let calories = 0;

    data.forEach(a => {
      minutes += Number(a.duration || 0);   // ✅ NO conversion
      calories += Number(a.calories || 0);
    });

    setTotalDuration(minutes);
    setTotalCalories(calories);
  };

  /* ===============================
     LOAD ACTIVITIES
  =============================== */
  const loadActivities = useCallback(async (filteredData = null) => {
    try {
      let data = [];

      if (filteredData) {
        data = Array.isArray(filteredData) ? filteredData : [];
      } else {
        if (!userId) return;
        const res = await getActivities(userId);
        data = Array.isArray(res.data) ? res.data : [];
      }

      setActivities(data);
      calculateTotals(data);
      return data;
    } catch (e) {
      console.error("Failed to load activities", e);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /* ===============================
     LOAD GOALS
  =============================== */
  const loadGoals = useCallback(async () => {
    if (!userId) return [];
    try {
      const res = await getGoals(userId);
      const data = Array.isArray(res.data) ? res.data : [];
      setGoals(data);
      return data;
    } catch {
      setGoals([]);
      return [];
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadActivities();
      loadGoals();
    }
  }, [userId, loadActivities, loadGoals]);

  /* ===============================
     LOADING STATE
  =============================== */
  if (!userId || loading) {
    return (
      <div style={{ padding: 30 }}>
        <div style={statsGrid}>
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 30, marginTop: 30 }}>
          <SectionSkeleton />
          <SectionSkeleton />
        </div>

        <div style={{ marginTop: 30 }}>
          <ListSkeleton />
        </div>
      </div>
    );
  }

  /* ===============================
     UI
  =============================== */
  return (
    <FittrTheme>
      <motion.div style={page} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={logout}
        >
          Logout
        </button>

        <div style={hero}>
          <h1>🔥 Fittr Dashboard</h1>
          <p style={{ opacity: 0.7 }}>
            <b>All Time:</b> {totalCalories} kcal • {totalDuration} mins
          </p>
        </div>

        <div style={statsGrid}>
          <StatCard title="Total Calories (All Time)" value={`${totalCalories} kcal`} />
          <StatCard title="Total Duration (All Time)" value={`${totalDuration} min`} />
          <StatCard title="Total Activities" value={activities.length} />
        </div>

        <div style={mainGrid}>
          <div>
            <Section title="📊 Activity Trends">
              {activities.length > 0 && <FitnessCharts activities={activities} />}
            </Section>

            <Section title="📅 Weekly Progress">
              <WeeklyProgressChart userId={userId} />
            </Section>

            <Section title="🏃 Activity History">
              <ActivityList activities={activities} refresh={loadActivities} userId={userId} />
            </Section>
          </div>

          <div>
            <Section title="👤 Profile Overview">
              <UserProfileCard userId={userId} />
            </Section>

            <Section title="🎯 Goals">
              <AddGoal userId={userId} refreshGoals={loadGoals} />
              <GoalList goals={goals} refreshGoals={loadGoals} />
            </Section>

            <Section title="📆 Daily Summary">
              <DailyProgress userId={userId} />
            </Section>
          </div>
        </div>

        <motion.div style={workoutWrap}>
          <h2>⏱ Live Workout</h2>
          <WorkoutSession userId={userId} refresh={loadActivities} />
        </motion.div>

        <Section title="🧍 Body Profile">
          <BodyProfile userId={userId} />
        </Section>

        <Section title="📂 Categories">
          <CategoryList />
        </Section>

      </motion.div>
    </FittrTheme>
  );
}

/* ===============================
   STYLES
=============================== */

const StatCard = ({ title, value }) => (
  <motion.div style={statCard} whileHover={{ scale: 1.05 }}>
    <p style={{ opacity: 0.7 }}>{title}</p>
    <h2 style={{ color: "#38bdf8" }}>{value}</h2>
  </motion.div>
);

const Section = ({ title, children }) => (
  <motion.div style={section}>
    <h3>{title}</h3>
    {children}
  </motion.div>
);

const page = { padding: "30px" };
const hero = { marginBottom: 30 };

const logout = {
  position: "fixed",
  top: 20,
  right: 20,
  background: "#38bdf8",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 20
};

const statCard = {
  background: "rgba(15,23,42,0.6)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  padding: 20,
  textAlign: "center",
  boxShadow: "0 0 25px rgba(56,189,248,0.35)"
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 30
};

const section = {
  background: "rgba(15,23,42,0.55)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 18,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 0 30px rgba(56,189,248,0.25)"
};

const workoutWrap = {
  marginTop: 40,
  padding: 30,
  borderRadius: 22,
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)"
};

export default Dashboard;


















