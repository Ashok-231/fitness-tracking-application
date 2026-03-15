import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import WorkoutSession from "../components/workout/WorkoutSession";

function Workout() {

  const userId = localStorage.getItem("userId");

  return (
    <Layout>

      <FittrTheme>

        <div style={page}>

          <h1 style={title}>
            ⏱ Live Workout
          </h1>

          <p style={subtitle}>
            Track your workout session in real time
          </p>

          <div style={workoutContainer}>
            <WorkoutSession userId={userId} />
          </div>

        </div>

      </FittrTheme>

    </Layout>
  );
}

/* ===============================
STYLES
=============================== */

const page = {
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto"
};

const title = {
  marginBottom: "5px"
};

const subtitle = {
  opacity: 0.7,
  marginBottom: "20px"
};

const workoutContainer = {
  display: "flex",
  justifyContent: "center"
};

export default Workout;