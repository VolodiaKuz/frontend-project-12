import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../store/userSlice.js';
import routes from '../utils/routes';

const handleExit = (navigate, dispatch) => () => {
  dispatch(logOut());
  navigate(routes.loginPage());
};

const Navbar = ({ homePage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exitButton = (
    <button type="button" className="btn btn-primary" onClick={handleExit(navigate, dispatch)}>
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
