import "./PurchasesList.css";

const PurchasesList = ({ product }) => {
  let total = product.quantity * product.product.price;
  // console.log(product);
  let date = product.createdAt;

  const onlyDate = date.split("T");
  // console.log(onlyDate);
  const onlyHour = onlyDate[1].split(".");
  // console.log(onlyHour);

  return (
    <article className="purchase-card">
      <header className="purchasae-card__header">
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
          <p className="product-card__paragraph">{product.product.brand}</p>
          <h2 className="product-card__title">{product.product.title}</h2>
        </div>
      </header>
      <section className="product-card__infodetail-container">
        <h3 className="product-card__title">Price</h3>
        <p className="product-card__paragraph">
          <em>
            {product.product.price} * {product.quantity}
          </em>
        </p>
        <p>
          <em>
            <span>TOTAL:</span>
            {total}
          </em>
        </p>
        <hr />
        <p>
          <span>Buyed at:</span>
          <br />
          <em>Date: {onlyDate[0]} / </em>
          <em>Hour: {onlyHour[0]}</em>
        </p>
      </section>
    </article>
  );
};

export default PurchasesList;
