import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLoaderData, useSubmit, Form } from "react-router-dom";
import ProductList from "../../components/home/ProductList/ProductList";
import CategoriesFilter from "../../components/home/CategoriesFilter/CategoriesFilter";
import useProducts from "../../hooks/queries/useProducts";
import getAllProducts from "../../services/products/getAllProducts";
import useCategories from "../../hooks/queries/useCategories";
import "./Home.css";

// viendo la clase 33, queda en el  minuto 50.
// viendo la clase 33, queda en el  minuto 1:16:00.

const Home = () => {
  const formId = useId();
  const submit = useSubmit();

  // el hook useRef, lo que hace es darme una referencias, variable que se recuerda entre renderizaciones.
  const formRef = useRef();

  // Cannot destructure property 'categories' of 'useLoaderData(...)' as it is undefined.
  // mi-07-06-2023 // clase 33 --> 1:13:26
  // retorno un objeto desde el homeLoader.js
  const { categories, title } = useLoaderData();

  const [titleValue, setTitleValue] = useState(title);

  const categoriesQueries = useCategories();
  // Recibe como parametro un objeto el acual a su vez recibe una KEY llamada --> queryKey: ["products"] <-la cual recibe un array.
  // useQuery solo se utiliza para hacer peticiones de tipo get
  const { data, isLoading, isError } = useProducts();
  // console.log(data); //me muestra los productos

  const handleChangeCategories = useCallback(() => {
    if (!formRef.current) return;

    submit(formRef.current);
  }, [submit]);

  // useEffect(() => {
  //   console.log(formRef.current);
  // }, []);
  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  if (isLoading) return <p>Loaidng products...</p>;
  if (isError) return <p>Opps, algo salío mal</p>;

  return (
    <div className="home-container">
      {/* <h2>Products</h2>
      <p> {JSON.stringify(data, null, 2)} </p> */}
      <aside>
        <CategoriesFilter
          formId={formId}
          onChangeCategories={handleChangeCategories}
          initialCategories={categories}
        />
      </aside>
      <section>
        <Form id={formId} ref={formRef}>
          <input
            type="search"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="What are you looking for?"
          />
        </Form>
        <ProductList categories={categories} title={title} />
        {/* <ProductList categories={categories} title={title} /> //esta incompleto, */}
        {/* //esta incompleto, seguir viendo el video de la clase para finalizar */}
      </section>
    </div>
  );
};

export default Home;
// Estas lineas de codigo eran las que retornabamos en vez
// {
//   isLoading && <p>Loaidng products...</p>;
// }
// {
//   !isLoading && isError && <p>Opps, algo salío mal</p>;
// }
// {
//   !isLoading && !isError && <p> {JSON.stringify(data, null, 2)} </p>;
// }
