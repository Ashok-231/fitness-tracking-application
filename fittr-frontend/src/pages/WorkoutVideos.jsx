import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";

function WorkoutVideos() {

const videos = [
{
title: "Cycling Workout",
url: "https://www.youtube.com/embed/1VY2Eo6rj2k"
},
{
title: "Yoga Full Body",
url: "https://www.youtube.com/embed/v7AYKMP6rOE"
},
{
title: "Gym Beginner Workout",
url: "https://www.youtube.com/embed/ixkQaZXVQjs"
},
{
title: "HIIT Cardio Workout",
url: "https://www.youtube.com/embed/ml6cT4AZdqI"
},
{
title: "Swimming Technique",
url: "https://www.youtube.com/embed/pFN2n7CRqhw"
},
{
title: "Jump Rope Workout",
url: "https://www.youtube.com/embed/1BZM3Kp0B3k"
},
{
title: "Push Ups Tutorial",
url: "https://www.youtube.com/embed/IODxDxX7oi4"
},
{
title: "Squats Workout",
url: "https://www.youtube.com/embed/aclHkVaku9U"
},
{
title: "Plank Exercise",
url: "https://www.youtube.com/embed/pSHjTRCQxIw"
},
{
title: "Stretching Routine",
url: "https://www.youtube.com/embed/2L2lnxIcNmo"
}
];


return ( <Layout> <FittrTheme>

    <div style={page}>

      <h1>🎥 Workout Videos</h1>
      <p style={{opacity:0.7}}>Learn exercises with guided videos</p>

      <div style={grid}>

        {videos.map((video,index)=>(
          <div key={index} style={card}>

            <h3>{video.title}</h3>

            <iframe
              width="100%"
              height="200"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            />

          </div>
        ))}

      </div>

    </div>

  </FittrTheme>
</Layout>


);
}

const page={
padding:"20px"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
gap:"20px",
marginTop:"20px"
};

const card={
background:"rgba(15,23,42,0.6)",
padding:"15px",
borderRadius:"15px",
boxShadow:"0 0 20px rgba(56,189,248,0.3)"
};

export default WorkoutVideos;
