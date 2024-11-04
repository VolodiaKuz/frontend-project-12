import { useTranslation } from 'react-i18next';

import signupPicture from '../assets/signup_logo.png';
import SignUpForm from '../components/Forms/SignUpForm';
import PageContainer from '../components/PageContainer';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className="card-body row p-5">
        <div className="d-flex align-items-center justify-content-center col-12 col-md-6">
          <img
            src={signupPicture}
            className="rounded-circle"
            alt={t('login.submit')}
          />
        </div>
        <SignUpForm />
      </div>
    </PageContainer>
  );
};

export default LoginPage;
