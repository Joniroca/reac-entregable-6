import axiosInstance from "../../api/axiosInstance";

const login = async ({ email, password }) => {
  try {
    const credentials = { email, password };
    const res = await axiosInstance.post("users/login", credentials);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
// login({ email: "", password: "" });

export default login;
