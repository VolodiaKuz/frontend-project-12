import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../utils/routes';
import PageContainer from '../components/PageContainer';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer type="notFound" notFound>
      <h1 className="h4 text-muted d-flex align-items-center justify-content-center">{t('notFound.header')}</h1>
      <p className="text-muted d-flex align-items-center justify-content-center">
        {t('notFound.message')}
      </p>
      <Link to={routes.mainPagePath()} className="d-flex align-items-center justify-content-center">{t('notFound.linkText')}</Link>
    </PageContainer>
  );
};

export default NotFoundPage;
