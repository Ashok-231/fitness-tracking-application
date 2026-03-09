import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import ActivityList from "../components/activity/ActivityList";
import { getActivities } from "../services/activityService";

function Activities() {
  const userId = localStorage.getItem("userId");
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    const res = await getActivities(userId);
    setActivities(res.data || []);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <Layout>
      <FittrTheme>
        <h1>🏃 Activities</h1>
        <ActivityList
          activities={activities}
          refresh={loadActivities}
          userId={userId}
        />
      </FittrTheme>
    </Layout>
  );
}

export default Activities;