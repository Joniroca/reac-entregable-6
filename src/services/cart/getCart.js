import axiosInstance from "../../api/axiosInstance";

const getCart = async (token) => {
  try {
    const res = await axiosInstance.get(`cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    //  La petición llegó al backend pero no respondío satisfactoriamente pero respondio algo fuerea del status (code 200)
    if (err.response) throw err.response.data;
    else
      throw new Error("algo salio con la peticion de categorias del carrito");
  }
};

export default getCart;
