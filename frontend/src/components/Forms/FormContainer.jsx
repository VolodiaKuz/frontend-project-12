import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
// import LogInForm from '../components/Forms/LogInForm';

const Container = ({ logInType, children }) => {
  const navigate = useNavigate();
  const pictureSrc = logInType ? 'auth_logo.jpeg' : 'signup_logo.png';
  const footer = (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>Нет аккаунта? </span>
        <a href="/signup">Регистрация</a>
      </div>
    </div>
  );

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <Navbar navigate={navigate} homePage={false} />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img
                        src={pictureSrc}
                        className="rounded-circle"
                        alt="Войти"
                      />
                    </div>
                    {children}
                  </div>
                  {/* {footer && logInType} */}
                  {logInType && footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
