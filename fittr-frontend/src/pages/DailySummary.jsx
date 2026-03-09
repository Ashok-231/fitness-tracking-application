import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import DailyProgress from "../components/progress/DailyProgress";

function DailySummary() {
  const userId = localStorage.getItem("userId");

  return (
    <Layout>
      <FittrTheme>
        <h1>📅 Daily Summary</h1>

        <div style={{ marginTop: "20px" }}>
          <DailyProgress userId={userId} />
        </div>
      </FittrTheme>
    </Layout>
  );
}

export default DailySummary;