import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function FitnessCharts({ activities }) {

  // 🔥 Use real category name from backend
  const labels = activities.map(a => a.category?.name || "Unknown");
  const durations = activities.map(a => a.duration || 0);
  const calories = activities.map(a => a.calories || 0);

  const barData = {
    labels,
    datasets: [
      {
        label: "Duration (mins)",
        data: durations,
        backgroundColor: "#4CAF50"
      },
      {
        label: "Calories",
        data: calories,
        backgroundColor: "#FF5722"
      }
    ]
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: calories,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4caf50",
          "#9c27b0",
          "#03a9f4",
          "#ff9800",
          "#8bc34a"
        ]
      }
    ]
  };

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
      <div style={{ width: "50%" }}>
        <h3>Activity Duration & Calories</h3>
        <Bar data={barData} />
      </div>

      <div style={{ width: "40%" }}>
        <h3>Calories Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default FitnessCharts;

