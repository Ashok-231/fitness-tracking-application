import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";

function WeeklyProgress() {
  const userId = localStorage.getItem("userId");

  return (
    <Layout>
      <FittrTheme>
        <h1>📈 Weekly Progress</h1>

        <div style={{ marginTop: "20px" }}>
          <WeeklyProgressChart userId={userId} />
        </div>
      </FittrTheme>
    </Layout>
  );
}

export default WeeklyProgress;