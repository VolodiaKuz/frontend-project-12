import { useTranslation } from 'react-i18next';

import loginPicture from '../assets/auth_logo.jpeg';
import LogInForm from '../components/Forms/LogInForm';
import PageContainer from '../components/PageContainer';
import LoginFooter from '../components/LoginFooter';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="card-body row p-5">
        <div className="d-flex align-items-center justify-content-center col-12 col-md-6">
          <img
            src={loginPicture}
            className="rounded-circle"
            alt={t('login.submit')}
          />
        </div>
        <LogInForm />
      </div>
      <LoginFooter />
    </PageContainer>
  );
};

export default LoginPage;
