import { useSelector } from "react-redux";
import getCart from "../../services/cart/getCart";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { token, isLogged } = useSelector((store) => store.auth);

  const query = useQuery({
    queryKey: [`cart`, isLogged],
    // queryKey: [`cart`],
    queryFn: () => getCart(token),
    enabled: isLogged,
  });
  return query;
};

export default useCart;
