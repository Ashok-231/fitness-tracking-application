import { useState, useEffect } from "react";
import { deleteActivity } from "../../services/activityService";

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
const [category, setCategory] = useState("");
const [filtered, setFiltered] = useState([]);

/* ===============================
AUTO FILTER
=============================== */

useEffect(() => {

let data = activities;

if (date) {
  data = data.filter(a => a.date === date);
}

if (category) {
  data = data.filter(a => a.name === category);
}

setFiltered(data);


}, [activities, date, category]);

/* ===============================
DELETE
=============================== */

const handleDelete = async (id) => {

if (!window.confirm("Delete this activity?")) return;

await deleteActivity(userId, id);
refresh();


};

return (

<div>

  {/* FILTER BAR */}

  <div style={filterBar}>

    <input
      type="date"
      value={date}
      onChange={(e)=>setDate(e.target.value)}
      style={input}
    />

    <select
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      style={input}
    >

      <option value="">All Activities</option>
      <option value="Running">Running</option>
      <option value="Walking">Walking</option>
      <option value="Gym">Gym</option>
      <option value="Yoga">Yoga</option>
      <option value="Cycling">Cycling</option>

    </select>

    <button
      onClick={()=>{
        setDate("");
        setCategory("");
      }}
      style={clearBtn}
    >
      Clear
    </button>

  </div>

  {/* ACTIVITY LIST */}

  {filtered.length === 0 ? (
    <p>No activities found</p>
  ) : (

    <div style={list}>

      {filtered.map(a => (

        <div key={a.id} style={card}>

          <div>

            <span style={{fontSize:"20px"}}>
              {icons[a.name] || "🔥"}
            </span>

            <b style={{marginLeft:"8px"}}>
              {a.name}
            </b>

            <span style={meta}>
              ({a.category?.name})
            </span>

            <div style={details}>
              {a.duration} mins • {a.calories} kcal
            </div>

          </div>

          <button
            onClick={()=>handleDelete(a.id)}
            style={deleteBtn}
          >
            ❌
          </button>

        </div>

      ))}

    </div>

  )}

</div>

);

}

/* ===============================
STYLES
=============================== */

const filterBar={
display:"flex",
gap:"10px",
marginBottom:"20px",
flexWrap:"wrap"
};

const input={
padding:"8px",
borderRadius:"8px",
border:"none"
};

const clearBtn={
padding:"8px 14px",
border:"none",
borderRadius:"8px",
background:"#38bdf8",
cursor:"pointer",
fontWeight:"bold"
};

const list={
display:"flex",
flexDirection:"column",
gap:"10px"
};

const card={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"12px",
borderRadius:"10px"
};

const meta={
marginLeft:"6px",
opacity:0.6
};

const details={
fontSize:"13px",
opacity:0.7
};

const deleteBtn={
background:"red",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
};

export default ActivityList;
