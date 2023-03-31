import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, location }) => {
  return (
    <header className="page__header header">
      <a href="https://simon-cat.github.io/mesto/" className="header__link">
        <img src={logo} alt="Логотип" className="header__logo logo" />
      </a>
      {isLoggedIn ? (
        <div className="header__user-controll-block">
          <span className="header__text">Gregomur@yandex.ru</span>
          <Link to="/sing-in" replace={true} className="header__link">
            Выйти
          </Link>
        </div>
      ) : (
        <div className="header__user-controll-block">
          {(!isLoggedIn && (location === "/sing-in")) && (
            <Link to="/sing-up" replace={true} className="header__link">
              Регистрация
            </Link>
          )}
          {(!isLoggedIn && location === "/sing-up") && (
            <Link to="/sing-in" replace={true} className="header__link">
              Войти
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
