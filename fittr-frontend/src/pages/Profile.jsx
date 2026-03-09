import Layout from "../components/Layout";
import FittrTheme from "../theme/FittrTheme";
import UserProfileCard from "../components/profile/UserProfileCard";
import BodyProfile from "../components/profile/BodyProfile";

function Profile() {
  const userId = localStorage.getItem("userId");

  return (
    <Layout>
      <FittrTheme>
        <h1>👤 Profile</h1>
        <UserProfileCard userId={userId} />
        <BodyProfile userId={userId} />
      </FittrTheme>
    </Layout>
  );
}

export default Profile;