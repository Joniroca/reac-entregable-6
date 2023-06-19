import axiosInstance from "../../api/axiosInstance";

const getProductById = async (productId) => {
  try {
    const res = await axiosInstance.get(`products/${productId}`);
    return res.data;
  } catch (err) {
    //  La petición llegó al backend pero no respondío satisfactoriamente pero respondio algo fuerea del status (code 200)
    if (err.response) throw err.response.data;
    else throw new Error("algo salio con la peticion de categorias");
  }
};

export default getProductById;
