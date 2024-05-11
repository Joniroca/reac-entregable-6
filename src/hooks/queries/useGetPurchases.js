import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getPurchases from "../../services/puchases/getPurchases";

const useGetPurchases = () => {
  const { token, isLogged } = useSelector((store) => store.auth);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["purchases", isLogged],
    queryFn: () => getPurchases(token),
    onSuccess: async () => {
      await queryClient.invalidateQueries[{ queryKey: "purchases" }];
    },
    enabled: isLogged,
  });
  return query;
};
// console.log(useGetPurchases);

export default useGetPurchases;
