import { useParams } from "react-router-dom";

function Profile() {
  let { nickname } = useParams();
  return <h1>Profile</h1>;
}

export default Profile;
