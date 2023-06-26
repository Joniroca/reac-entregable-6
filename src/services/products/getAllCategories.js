import axiosInstance from "../../api/axiosInstance"; //me ponia que no estaba definido

const getAllCategories = async () => {
  try {
    // falta importar axios instance
    const res = await axiosInstance.get(`categories`);

    return res.data;
  } catch (err) {
    console.error(err);
    //  La petición llegó al backend pero no respondío satisfactoriamente pero respondio algo fuerea del status (code 200)
    if (err.response) throw err.response.data;
    else throw new Error("algo salio con la peticion de categorias");
  }
};

export default getAllCategories;
