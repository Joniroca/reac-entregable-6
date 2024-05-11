import PurchasesList from "../../components/purchasesList/PurchasesList";
import useGetPurchases from "../../hooks/queries/useGetPurchases";
import "./purchases.css";

const Purchases = () => {
  const { data, isLoading, isError, error } = useGetPurchases();
  // console.log({ data });
  if (isLoading) return <p>Loading DATA product...</p>;
  if (isError)
    return <p> {error.message ?? "No se pudo cargar el producto"} </p>;
  // Verifica si 'data' tiene un valor antes de acceder a su propiedad 'id'
  if (!data) return <p>No data available</p>;

  // let total;

  return (
    <div>
      <h1>Purchases</h1>
      <ol className="product-list">
        {data?.map((product) => (
          <li className="product-list__item" key={product.id}>
            <PurchasesList product={product} />
          </li>
        ))}
      </ol>
      {/* <ul className="product-list">
        {data?.map((product) => (
          <li className="product-list__item" key={product.id}>
            <header className="product-card__header">
              <div className="product-card__container-img">
                <img
                  className="product-card__img product-card__container-img--visible"
                  src={product.product.images[0].url}
                  alt={product.product.title + "image 0"}
                />
                <img
                  className="product-card__img product-card__container-img--hidden"
                  src={product.product.images[1].url}
                  alt={product.product.title + "image 1"}
                />
              </div>
              <div className="product-card__header-main-info">
                <p className="product-card__paragraph">
                  {product.product.brand}
                </p>
                <h2 className="product-card__title">{product.product.title}</h2>
              </div>
            </header>
            <section className="product-card__infodetail-container">
              <h3 className="product-card__title">Price</h3>
              <p className="product-card__paragraph">
                <em>
                  {product.product.price} * {product.quantity}{" "}
                </em>
                <em>
                  <p>TOTAL: </p>
                  {total}
                </em>
              </p>
            </section>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Purchases;
