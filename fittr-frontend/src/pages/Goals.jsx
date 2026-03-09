import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import AddGoal from "../components/goal/AddGoal";
import GoalList from "../components/goal/GoalList";
import { getGoals } from "../services/goalService";

function Goals() {
  const userId = localStorage.getItem("userId");
  const [goals, setGoals] = useState([]);

  const loadGoals = async () => {
    const res = await getGoals(userId);
    setGoals(res.data || []);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <Layout>
      <FittrTheme>
        <h1>🎯 Goals</h1>
        <AddGoal userId={userId} refreshGoals={loadGoals} />
        <GoalList goals={goals} refreshGoals={loadGoals} />
      </FittrTheme>
    </Layout>
  );
}

export default Goals;