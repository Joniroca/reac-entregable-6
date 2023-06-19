import axiosInstance from "../../api/axiosInstance";

const deleteProductFromCart = async (cartProductId, token) => {
  try {
    await axiosInstance.delete(`cart/${cartProductId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.data)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else
      throw new Error("algo salió mal con la peticion para borrado de carrito");
  }
};

export default deleteProductFromCart;
