// chartSetup.js
// This file is for Chart.js GLOBAL REGISTRATION only.
// ⚠️ DO NOT export anything from this file.

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register all required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

// ❌ NO export
// ❌ NO default export
// ❌ NO React component
