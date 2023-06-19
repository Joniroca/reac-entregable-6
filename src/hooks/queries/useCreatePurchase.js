import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import createPurchase from "../../services/puchases/createPurchase";

const useCreatePurchase = () => {
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createPurchase(token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      //invalidar la peticion para obtener (get) los purchases
      await queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
  return mutation;
};

export default useCreatePurchase;
