import { Link } from 'react-router-dom';
import routes from '../utils/routes';
import PageContainer from '../components/PageContainer';

const NotFoundPage = () => (
  <PageContainer type="notFound" notFound>
    <h1 className="h4 text-muted d-flex align-items-center justify-content-center">Страница не найдена</h1>
    <p className="text-muted d-flex align-items-center justify-content-center">
      Но вы можете перейти
    </p>
    <Link to={routes.mainPagePath()} className="d-flex align-items-center justify-content-center">на главную страницу </Link>
  </PageContainer>
);

export default NotFoundPage;
