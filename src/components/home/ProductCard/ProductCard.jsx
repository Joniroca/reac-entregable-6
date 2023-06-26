import { useSelector } from "react-redux";
import useAddProductToCart from "../../../hooks/queries/useAddProductToCart";
import "./ProductCard.css";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/queries/useCart";

import "./ProductCard.css";

// Clase 31 2 horas del video aproximadamente empezamos la construcción de este componente que no funciona el tema deel cmabio de imagen.
// Al parecer todo esta bien pero algo debe estar pasando porque no se lleva a cabo el cambio atomatico de imagenes desde el css --hidden --visible.

const ProductCard = ({ product }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { mutate } = useAddProductToCart();
  const { data, isLoading } = useCart();
  const navigate = useNavigate();

  let isProductInCart = data?.some(
    (cartProduct) => cartProduct.productId === product.id
  );

  const isAddBtnVisible = !isLogged || !isProductInCart;

  const handleAdd = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    // console.log(
    //   `el usuario queire agreagr al carriot el producto ${product.title}`
    // );
    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: product.id });
  };

  return (
    // Si tengo problemas de navegación deberia revisar el axiosInstance y los / fordward slah ya que es posible que se este duplicando
    <Link to={"/product/" + product.id}>
      <article className="product-card">
        <header className="product-card__header">
          <div className="product-card__container-img">
            <img
              className="product-card__img product-card__container-img--visible"
              src={product.images[0].url}
              alt={product.title + "image 0"}
            />
            <img
              className="product-card__img product-card__container-img--hidden"
              src={product.images[1].url}
              alt={product.title + "image 1"}
            />
          </div>
          <div className="product-card__header-main-info">
            <p className="product-card__paragraph"> {product.brand} </p>
            <h2 className="product-card__title"> {product.title} </h2>
          </div>
        </header>
        <section className="product-card__infodetail-container">
          <h3 className="product-card__title">Price</h3>
          <p className="product-card__paragraph">
            <em> {product.price} </em>
          </p>
        </section>

        {isAddBtnVisible && (
          <button
            className="product-card__btn"
            onClick={handleAdd}
            disabled={isLoading}
          >
            <i className="bx bxs-cart-add"></i>
          </button>
        )}

        {!isAddBtnVisible && <p>Ya tienes este producto en el carrito</p>}
      </article>
    </Link>
  );
};

export default ProductCard;
