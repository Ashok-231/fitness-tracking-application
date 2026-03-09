import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import FitnessCharts from "../components/charts/FitnessCharts";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";
import { getActivities } from "../services/activityService";
import { useEffect, useState } from "react";

function Analytics() {

  const [activities, setActivities] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await getActivities(userId);
      setActivities(res.data || []);
    } catch {
      setActivities([]);
    }
  };

  /* TOTAL STATS */

  const totalCalories = activities.reduce((sum,a)=>sum+(a.calories||0),0);
  const totalDuration = activities.reduce((sum,a)=>sum+(a.duration||0),0);

  /* TOP ACTIVITY */

  const activityMap = {};

  activities.forEach(a=>{
    const name = a.name || "General";

    if(!activityMap[name]){
      activityMap[name]=0;
    }

    activityMap[name]+=a.duration||0;
  });

  const topActivity = Object.entries(activityMap)
    .sort((a,b)=>b[1]-a[1])[0];

  return (
    <Layout>
      <FittrTheme>

        <h1>📊 Analytics</h1>

        {/* STATS */}
        <div style={statsGrid}>

          <div style={statCard}>
            <h3>Total Calories</h3>
            <p>{totalCalories} kcal</p>
          </div>

          <div style={statCard}>
            <h3>Total Workout Time</h3>
            <p>{totalDuration} mins</p>
          </div>

          <div style={statCard}>
            <h3>Top Activity</h3>
            <p>{topActivity ? topActivity[0] : "None"}</p>
          </div>

        </div>

        {/* ACTIVITY CHART */}
        <div style={section}>
          <h3>Activity Trends</h3>
          <FitnessCharts activities={activities} />
        </div>

        {/* WEEKLY CHART */}
        <div style={section}>
          <h3>Weekly Progress</h3>
          <WeeklyProgressChart userId={userId} />
        </div>

      </FittrTheme>
    </Layout>
  );
}

/* STYLES */

const statsGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"20px",
  marginTop:"20px",
  marginBottom:"40px"
};

const statCard = {
  background:"rgba(15,23,42,0.6)",
  padding:"20px",
  borderRadius:"15px",
  textAlign:"center",
  border:"1px solid rgba(255,255,255,0.08)"
};

const section = {
  background:"rgba(15,23,42,0.55)",
  padding:"20px",
  borderRadius:"15px",
  marginBottom:"30px",
  border:"1px solid rgba(255,255,255,0.06)"
};

export default Analytics;