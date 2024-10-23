import Navbar from '../components/Navbar';

const NotFoundPage = () => (
  <div className="h-100 bg-light">
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar homePage={false} />
          <div className="text-center">
            <img
              alt="Страница не найдена"
              className="img-fluid h-25"
              src="404.JPG"
              width="500"
            />
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">
              Но вы можете перейти
              {' '}
              <a href="/">на главную страницу</a>
            </p>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  </div>
);

export default NotFoundPage;
