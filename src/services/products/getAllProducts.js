import axiosInstance from "../../api/axiosInstance"; //me ponia que no estaba definido
const getAllProducts = async (categories, title) => {
  try {
    const params = { title, categoryId: categories };
    const res = await axiosInstance.get("products/", { params });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default getAllProducts;
