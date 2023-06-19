import axiosInstance from "../../api/axiosInstance";

const createPurchase = async (token) => {
  try {
    await axiosInstance.post("purchases/", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.data)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else
      throw new Error(
        "algo salió mal con la peticion para comprar el contenido del carrito"
      );
  }
};

export default createPurchase;
