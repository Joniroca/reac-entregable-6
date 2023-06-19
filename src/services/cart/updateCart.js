import axiosInstance from "../../api/axiosInstance";

const updateCart = async ({ cartProductId, newQuantity, token }) => {
  try {
    const body = { quantity: newQuantity };
    await axiosInstance.put(`cart/${cartProductId}`, body, {
      headers: { Autorizathion: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.data)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else
      throw new Error(
        "algo salió mal con la peticion para actualizar el carito"
      );
  }
};

export default updateCart;
