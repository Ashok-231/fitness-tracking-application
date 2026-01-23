import { useState } from "react";
import {
  deleteActivity,
  filterActivities
} from "../../services/activityService";

const icons = {
  Running: "🏃",
  Cycling: "🚴",
  Walking: "🚶",
  Yoga: "🧘",
  Gym: "🏋️",
  Swimming: "🏊",
  Football: "⚽",
  Cricket: "🏏"
};

function ActivityList({ activities, refresh, userId }) {
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  /* ===============================
     DELETE ACTIVITY
  =============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    await deleteActivity(userId, id);
    refresh(); // reload all
  };

  /* ===============================
     APPLY FILTER
  =============================== */
  const applyFilter = async () => {
    const params = { userId };

    if (date) params.date = date;
    if (categoryId) params.categoryId = categoryId;

    const res = await filterActivities(params);

    // 🔥 update parent state via refresh pattern
    refresh(res.data);
  };

  /* ===============================
     CLEAR FILTER
  =============================== */
  const clearFilter = () => {
    setDate("");
    setCategoryId("");
    refresh(); // load all activities
  };

  if (!activities || activities.length === 0) {
    return (
      <div>
        <h4>📋 Activities</h4>
        <p>No activities found</p>
      </div>
    );
  }

  return (
    <div>
      {/* ===============================
          FILTER BAR
      =============================== */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="2">Running</option>
          <option value="3">Walking</option>
          <option value="4">Gym</option>
          <option value="5">Yoga</option>
          <option value="6">Cycling</option>
        </select>

        <button onClick={applyFilter}>🔍 Filter</button>
        <button onClick={clearFilter}>♻ Clear</button>
      </div>

      {/* ===============================
          ACTIVITY LIST
      =============================== */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {activities.map((a) => (
          <li
            key={a.id}
            style={{
              marginBottom: "8px",
              padding: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px"
            }}
          >
            {icons[a.name] || "🔥"}{" "}
            <b>{a.name}</b>{" "}
            ({a.category?.name}) –{" "}
            {a.duration} mins –{" "}
            {a.calories} kcal

            <button
              onClick={() => handleDelete(a.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;



