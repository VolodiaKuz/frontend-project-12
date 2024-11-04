import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import notfoundPicture from '../assets/404.JPG';

import routes from '../utils/routes';
import PageContainer from '../components/PageContainer';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="d-flex align-items-center justify-content-center">
        <img
          src={notfoundPicture}
          className="rounded-circle"
          alt={t('login.submit')}
          width="250"
        />
      </div>
      <h1 className="h4 text-muted d-flex align-items-center justify-content-center">{t('notFound.header')}</h1>
      <p className="text-muted d-flex align-items-center justify-content-center">
        {t('notFound.message')}
      </p>
      <Link to={routes.mainPage()} className="d-flex align-items-center justify-content-center mb-3">{t('notFound.linkText')}</Link>
    </PageContainer>
  );
};

export default NotFoundPage;
