import LoginForm from "../../components/login/LoginForm";
import "./Login.css";
// import login from "../../services/auth/login";
import { startSessionThunk } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const dispatch = useDispatch();
  // El useLocation me da información acerca de la ruta, en este caso queremos saber si se le pasó la ruta de preferencia por el "state" --> Las rutas tienen una propiedad state por donde ellas pueden pasarse informaci+on entre ellas
  const location = useLocation();
  const from = location.state?.from;

  const handleLogin = async (loginData) => {
    // ya no hace esto, ahora ejecuta el thunk
    // const userData = await login(loginData);
    // console.log(userData);
    // console.log(loginData);

    dispatch(startSessionThunk(loginData));
    // startSessionThunk();
  };
  return (
    <div>
      <section>
        <p>Welcome to Colombia</p>

        <section>
          <LoginForm onLogin={handleLogin} />
        </section>
      </section>

      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;
