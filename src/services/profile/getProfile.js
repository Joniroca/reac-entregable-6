import axiosInstance from "../../api/axiosInstance";

const getProfile = async (token) => {
  try {
    const res = await axiosInstance.get("user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
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

export default getProfile;
