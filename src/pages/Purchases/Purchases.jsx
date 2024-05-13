import PurchasesList from "../../components/purchasesList/PurchasesList";
import useGetPurchases from "../../hooks/queries/useGetPurchases";
import "./Purchases.css";

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
    </div>
  );
};

export default Purchases;
