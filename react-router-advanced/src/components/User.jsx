import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return <h3>User Profile for ID: {userId}</h3>;
};

export default User;
