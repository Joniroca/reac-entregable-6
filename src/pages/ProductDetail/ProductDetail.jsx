import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductById from "../../hooks/queries/useProductById";
import ProductList from "../../components/home/ProductList/ProductList";
import useAddProductToCart from "../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import useCart from "../../hooks/queries/useCart";

const ProductDetail = () => {
  const navigate = useNavigate();
  const cartQuery = useCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { productId } = useParams();
  // console.log(productId);
  const { mutate } = useAddProductToCart();
  const { data, isLoading, isError, error } = useProductById(productId);

  let isProductInCart =
    cartQuery.data?.some((cartProduct) => cartProduct.productId === data?.id) ??
    false;

  const quantityInCart =
    cartQuery.data?.find(
      (cartProduct) => Number(cartProduct.productId) === Number(productId)
    )?.quantity ?? 1;

  const [quantity, setQuantity] = useState(Number(quantityInCart));

  //  SE COPIA Y SE LLEVA AL COMPONENTE CartProduct
  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if (newQuantity <= stock) setQuantity(newQuantity);
  };
  const decrement = () => {
    const newQuantity = quantity - 1;
    const minStock = 1;
    if (newQuantity >= minStock) setQuantity(newQuantity);
  };

  const handleAddCart = () => {
    if (isLogged) mutate({ quantity, productId });
    else navigate("/login");
  };

  useEffect(() => {
    setQuantity(Number(quantityInCart));
  }, [quantityInCart, data]);

  if (isLoading) return <p>Loading DATA product...</p>;
  if (isError)
    return <p> {error.message ?? "No se pudo cargar el producto"} </p>;
  // Verifica si 'data' tiene un valor antes de acceder a su propiedad 'id'
  if (!data) return <p>No data available</p>;

  return (
    <section>
      <section>
        <div>
          <img src={data.images[0].url} alt="imagen1" />
        </div>
        <div>
          <h3> {data.brand} </h3>
          <h2> {data.title} </h2>

          <p>{data.description}</p>

          <div>
            <div>
              <h3>Price</h3>
              <p>
                <em> {data.price} </em>
              </p>
            </div>
            <div>
              <h3> Quantity</h3>
              <div>
                <button onClick={decrement}>-</button>
                <span> {quantity} </span>
                <button onClick={increment}>+</button>
              </div>
            </div>
          </div>
          {!isProductInCart && (
            <button onClick={handleAddCart}>Add to cart</button>
          )}
          {isProductInCart && <button>Update in cart...</button>}
        </div>
      </section>
      <ProductList
        categories={data.categoryId}
        excludeIds={[data.id]}
        // title={data.title}
      />
    </section>
  );
};

export default ProductDetail;
