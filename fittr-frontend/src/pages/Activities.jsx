import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import ActivityList from "../components/activity/ActivityList";
import { getActivities } from "../services/activityService";

function Activities() {

const userId = localStorage.getItem("userId");

const [activities, setActivities] = useState([]);

const loadActivities = async () => {


try {

  const res = await getActivities(userId);
  setActivities(Array.isArray(res.data) ? res.data : []);

} catch (err) {

  console.error("Failed to load activities", err);
  setActivities([]);

}


};

useEffect(() => {


if (userId) {
  loadActivities();
}


}, [userId]);

return (

<Layout>
  <FittrTheme>

    <div style={{ padding: "20px" }}>

      <h1>🏃 Activities</h1>

      <ActivityList
        activities={activities}
        refresh={loadActivities}
        userId={userId}
      />

    </div>

  </FittrTheme>
</Layout>


);

}

export default Activities;
