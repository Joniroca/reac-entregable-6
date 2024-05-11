import axiosInstance from "../../api/axiosInstance";

const getPurchases = async (token) => {
  try {
    const res = await axiosInstance.get("purchases/", {
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
        "algo salió mal con la peticion para ver el contenido de las compras"
      );
  }
};
// console.log(getPurchases);

export default getPurchases;
