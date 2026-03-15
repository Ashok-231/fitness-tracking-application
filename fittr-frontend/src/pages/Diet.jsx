import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import DietSuggestions from "../components/diet/DietSuggestions";

function Diet() {

  const userId = localStorage.getItem("userId");

  return (
    <Layout>
      <FittrTheme>
        <h1>🥗 Diet Plan</h1>
        <DietSuggestions userId={userId} />
      </FittrTheme>
    </Layout>
  );
}

export default Diet;
