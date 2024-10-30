import { useTranslation } from 'react-i18next';
import routes from '../utils/routes';

const handleExit = (navigate) => () => {
  localStorage.clear();
  navigate(routes.loginPagePath());
};

const Navbar = ({ navigate, homePage }) => {
  const { t } = useTranslation();
  const exitButton = (
    <button type="button" className="btn btn-primary" onClick={handleExit(navigate)}>
      {t('logout')}
    </button>
  );
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('hexletChat')}
        </a>
        {homePage && exitButton}
      </div>
    </nav>
  );
};

export default Navbar;
