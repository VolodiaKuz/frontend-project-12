import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Navbar from './Navbar';
import loginPicture from '../assets/auth_logo.jpeg';
import signinPicture from '../assets/signup_logo.png';
import notfoundPicture from '../assets/404.JPG';

const getSrcPath = (logInType, notFound) => {
  if (logInType) return loginPicture;
  if (notFound) return notfoundPicture;
  return signinPicture;
};

const Container = ({ logInType, children, notFound }) => {
  const navigate = useNavigate();
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
