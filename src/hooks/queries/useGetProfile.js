import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getProfile from "../../services/profile/getProfile";

const useGetProfile = () => {
  const { token, isLogged } = useSelector((store) => store.auth);

  const query = useQuery({
    queryKey: ["profile", isLogged],
    queryFn: () => getProfile(token),
    enabled: isLogged,
  });
  return query;
};

export default useGetProfile;
