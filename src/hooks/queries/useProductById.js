import { useQuery } from "@tanstack/react-query";
import getProductById from "../../services/products/getProductById";

const useProductById = (productId) => {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    onError: (err) => {
      console.error(err);
    },
  });
  // console.log(productId);
  return query;
};

export default useProductById;
