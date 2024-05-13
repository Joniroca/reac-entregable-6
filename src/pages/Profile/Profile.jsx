import useGetProfile from "../../hooks/queries/useGetProfile";

const Profile = () => {
  const { data } = useGetProfile();
  console.log(data);
  return (
    <div>
      <h3>Profile</h3>
    </div>
  );
};

export default Profile;
