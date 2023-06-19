import "./Cart.css";
import useCart from "../../hooks/queries/useCart";
import CartProduct from "../CartProduct/CartProduct";
import useCreatePurchase from "../../hooks/queries/useCreatePurchase";
import { useSelector } from "react-redux";

const Cart = ({ isVisible }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { data, isLoading, isError, error } = useCart();

  const createPurchseMutation = useCreatePurchase();

  const reducer = (acc, cartProduct) => {
    const quantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    return acc + quantity * price;
  };

  const total = data?.reduce(reducer, 0) ?? 0;

  const toggleCart = isVisible
    ? "wrapper-cart"
    : "wrapper-cart wrapper-cart--hidden";

  const handleCheckout = () => {
    if (isLogged) createPurchseMutation.mutate();
  };

  if (isLoading) return <p>Loading cart...</p>;

  if (isError)
    return (
      <p> {error.message ?? "No se pudo cargar el estado del carrito"} </p>
    );
  return (
    <div className={toggleCart}>
      <aside className="cart">
        <h2 className="cart__title">SHOPPING CART</h2>

        {!data.length && <p>tu carrito NO tiene productos</p>}

        {Boolean(data.length) &&
          data.map(
            <div className="cart__container-list">
              <ul className="cart__list">
                {data.map((cartProduct) => (
                  <li key={cartProduct.id}>
                    <CartProduct cartProduct={cartProduct} />
                  </li>
                ))}
              </ul>

              <div>
                <div>
                  <p>
                    <span>TOTAL:</span>
                    <em>$ {total.toFixed(2)}</em>
                  </p>

                  <button
                    onClick={handleCheckout}
                    disabled={createPurchseMutation.isLoading || isLoading}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
      </aside>
    </div>
  );
};

export default Cart;
