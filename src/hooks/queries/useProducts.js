import { useQuery } from "@tanstack/react-query";
import getAllProducts from "../../services/products/getAllProducts";
// video clase 33 --> 1:05:00
const useProducts = (categories, title) => {
  const query = useQuery({
    queryKey: ["products", { categories, title }],
    queryFn: () => getAllProducts(categories, title),
  });
  return query;
};

export default useProducts;
