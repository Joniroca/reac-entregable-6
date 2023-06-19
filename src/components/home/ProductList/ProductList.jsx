import useProducts from "../../../hooks/queries/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ categories, title, excludeIds = [] }) => {
  const { data, isLoading, isError } = useProducts(categories, title);

  if (isLoading) return <p>Loaidng products...</p>;
  if (isError) return <p>Opps, algo salío mal</p>;

  return (
    <div>
      <h2>ProductList</h2>
      <ul className="product-list">
        {data
          .filter((product) => !excludeIds.includes(product.id))
          .map((product) => (
            <li className="product-list__item" key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
