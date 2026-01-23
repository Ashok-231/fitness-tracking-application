import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { getProgress } from "../../services/progressService";

function WeeklyProgressChart({ userId }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    getProgress(userId)
      .then(res => {
        const arr = Array.isArray(res.data) ? res.data : [];
        setLabels(arr.map(p => p.date));
        setData(arr.map(p => p.totalCalories));
      })
      .catch(() => {
        setLabels([]);
        setData([]);
      });
  }, [userId]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (labels.length === 0 || data.length === 0) return;

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Calories Burned",
            data,
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    chartRef.current = chart;

    return () => chart.destroy();
  }, [labels, data]);

  return (
    <div style={{ height: "300px" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default WeeklyProgressChart;




