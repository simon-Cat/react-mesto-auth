import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="page__header header">
      <a href="https://simon-cat.github.io/mesto/" className="header__link">
        <img src={logo} alt="Логотип" className="header__logo logo" />
      </a>
    </header>
  );
};

export default Header;
