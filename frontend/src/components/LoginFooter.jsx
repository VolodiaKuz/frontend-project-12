import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from '../utils/routes';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>
          {t('login.newToChat')}
          {' '}
        </span>
        <Link to={routes.signUpPage()}>{t('login.signup')}</Link>
      </div>
    </div>
  );
};

export default Footer;
