import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import Layout from "../components/Layout"; // ✅ USE SIDEBAR LAYOUT
import ActivityList from "../components/activity/ActivityList";
import AddGoal from "../components/goal/AddGoal";
import GoalList from "../components/goal/GoalList";
import CategoryList from "../components/category/CategoryList";
import DailyProgress from "../components/progress/DailyProgress";
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
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH ================= */
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) window.location.href = "/";
    else setUserId(Number(id));
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
    } catch (e) {
      console.error("Failed to load activities", e);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /* ================= LOAD GOALS ================= */
  const loadGoals = useCallback(async () => {
    try {
      if (!userId) return;
      const res = await getGoals(userId);
      const data = Array.isArray(res.data) ? res.data : [];
      setGoals(data);
    } catch {
      setGoals([]);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadActivities();
      loadGoals();
    }
  }, [userId, loadActivities, loadGoals]);

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
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 30, marginTop: 30 }}>
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

        <motion.div style={page} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>

          <div style={hero}>
            <h1>🔥 Fittr Dashboard</h1>
            <p style={{ opacity: 0.7 }}>
              <b>All Time:</b> {totalCalories} kcal • {totalDuration} mins
            </p>
          </div>

          <div style={statsGrid}>
            <StatCard title="Total Calories" value={`${totalCalories} kcal`} />
            <StatCard title="Total Duration" value={`${totalDuration} min`} />
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
                <ActivityList activities={activities} userId={userId} />
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

          <Section title="🧍 Body Profile">
            <BodyProfile userId={userId} />
          </Section>

          <Section title="📂 Categories">
            <CategoryList />
          </Section>

        </motion.div>

      </FittrTheme>
    </Layout>
  );
}

/* ================= UI HELPERS ================= */

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

/* ================= STYLES ================= */

const page = { padding: "20px" };
const hero = { marginBottom: 30 };

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 20,
  marginBottom: 30
};

const statCard = {
  background: "rgba(15,23,42,0.6)",
  borderRadius: 18,
  padding: 20,
  textAlign: "center"
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 30
};

const section = {
  background: "rgba(15,23,42,0.55)",
  borderRadius: 18,
  padding: 20,
  marginBottom: 20
};

export default Dashboard;
