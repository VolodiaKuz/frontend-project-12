import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../utils/routes';

const handleExit = (navigate, auth) => () => {
  localStorage.clear();
  auth.logOut();
  navigate(routes.loginPage());
};

const Navbar = ({ navigate, homePage }) => {
  const { t } = useTranslation();
  const auth = useAuth();

  const exitButton = (
    <button type="button" className="btn btn-primary" onClick={handleExit(navigate, auth)}>
      {t('logout')}
    </button>
  );
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={routes.mainPage()} className="navbar-brand">{t('hexletChat')}</Link>
        {homePage && exitButton}
      </div>
    </nav>
  );
};

export default Navbar;
