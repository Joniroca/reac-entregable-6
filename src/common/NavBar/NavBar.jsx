import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../store/slices/authSlice";

import "./NavBar.css";

const NavBar = ({ updateCartVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.auth.isLogged);

  const userTo = isLogged ? "/profile" : "/login";

  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const getClass = ({ isActive }) => {
    if (isActive) return "header__nav__link header__nav__link--active";
    else return "header__nav__link";
  };

  const handleCartClick = () => {
    if (isLogged) updateCartVisible();
    else navigate("/login");
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <h1>e-commerce</h1>
      </Link>

      <nav>
        <ul className="header__nav__list">
          <li>
            <NavLink to={userTo} className={getClass}>
              <i className="bx bx-user"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/purchases" className={getClass}>
              <i className="bx bx-box"></i>
            </NavLink>
          </li>

          <li>
            <button className="header__nav__btn" onClick={handleCartClick}>
              <i className="bx bx-cart-alt"></i>
            </button>
          </li>

          {isLogged && (
            <li>
              <button className="header__nav__btn" onClick={logout}>
                <i className="bx bx-log-out"></i>
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* {isLogged && <button onClick={logout}>LOGOUT</button>} */}
    </header>
  );
};

export default NavBar;
