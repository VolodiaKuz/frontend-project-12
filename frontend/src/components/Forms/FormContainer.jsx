import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Navbar from '../Navbar';

const getSrcPath = (logInType, notFound) => {
  if (logInType) return 'auth_logo.jpeg';
  if (notFound) return '404.JPG';
  return 'signup_logo.png';
};

const Container = ({ logInType, children, notFound }) => {
  const navigate = useNavigate();
  // const pictureSrc = logInType ? 'auth_logo.jpeg' : 'signup_logo.png';
  const pictureSrc = getSrcPath(logInType, notFound);
  const divClass = cn('d-flex', 'align-items-center', 'justify-content-center', {
    'col-12 col-md-6': !notFound,
  });

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
                    <div className={divClass}>
                      <img
                        src={pictureSrc}
                        className="rounded-circle"
                        alt="Войти"
                        width={notFound && '250'}
                      />
                    </div>
                    {children}
                  </div>
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
