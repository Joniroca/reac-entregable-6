import axiosInstance from "../../api/axiosInstance";

const addProductToCart = async ({ token, quantity, productId }) => {
  try {
    const body = { quantity, productId };

    await axiosInstance.post("cart", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Algo salio mal con la peticion del carrito");
  }
};

export default addProductToCart;
