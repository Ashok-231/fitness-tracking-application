import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import WorkoutSession from "../components/workout/WorkoutSession";

function Workout() {
  const userId = localStorage.getItem("userId");

  return (
    <Layout>
      <FittrTheme>
        <h1>⏱ Live Workout</h1>

        <div style={{ marginTop: "20px" }}>
          <WorkoutSession userId={userId} />
        </div>

      </FittrTheme>
    </Layout>
  );
}

export default Workout;