const homeLoader = ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") ?? "";

  const categories = url.searchParams
    .getAll("categories")
    .filter((categoryId) => Boolean(categoryId))
    .map((categoryId) => Number(categoryId));

  return { categories, title };
};

export default homeLoader;

// console.log("a mimir");

// const nombre = "juanito";
// console.log(`hola soy {nombre}`);
// console.log("hola soy " + nombre);
