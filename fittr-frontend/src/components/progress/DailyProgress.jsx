import { useEffect, useState } from "react";
import { getProgress } from "../../services/progressService";

const DailyProgress = ({ userId }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!userId) return;

    getProgress(userId).then(res => {
      const arr = Array.isArray(res.data) ? res.data : [];

      const today = new Date().toDateString();

      const todayData = arr.find(p => {
        const apiDate = new Date(p.date).toDateString();
        return apiDate === today;
      });

      setProgress(todayData || null);
    });
  }, [userId]);

  if (!progress) return <p>📅 No progress recorded for today</p>;

  return (
    <div>
      <h3>Daily Progress</h3>
      <p>📅 <b>{new Date(progress.date).toLocaleDateString()}</b></p>
      <p>⏱ {progress.totalDuration} mins</p>
      <p>🔥 {progress.totalCalories} kcal</p>
    </div>
  );
};

export default DailyProgress;




