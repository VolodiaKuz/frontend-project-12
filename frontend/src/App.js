import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <div class="h-100 bg-light">
        <div class="h-100">
          <div class="h-100" id="chat">
            <div class="d-flex flex-column h-100">
              <nav class="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div class="container">
                  <a class="navbar-brand" href="/">Hexlet Chat</a
                  ><button type="button" class="btn btn-primary">Выйти</button>
                </div>
              </nav>
              <div class="container-fluid h-100">
                <div class="row justify-content-center align-content-center h-100">
                  <div class="col-12 col-md-8 col-xxl-6">
                    <div class="card shadow-sm">
                      <div class="card-body row p-5">
                        <div
                          class="col-12 col-md-6 d-flex align-items-center justify-content-center"
                        >
                          <img src="auth_logo.jpeg" class="rounded-circle" alt="Войти" />
                        </div>
                        <form class="col-12 col-md-6 mt-3 mt-md-0">
                          <h1 class="text-center mb-4">Войти</h1>
                          <div class="form-floating mb-3">
                            <input
                              name="username"
                              autocomplete="username"
                              required=""
                              placeholder="Ваш ник"
                              id="username"
                              class="form-control"
                              value=""
                            /><label for="username">Ваш ник</label>
                          </div>
                          <div class="form-floating mb-4">
                            <input
                              name="password"
                              autocomplete="current-password"
                              required=""
                              placeholder="Пароль"
                              type="password"
                              id="password"
                              class="form-control"
                              value=""
                            /><label class="form-label" for="password"
                            >Пароль</label
                            >
                          </div>
                          <button
                            type="submit"
                            class="w-100 mb-3 btn btn-outline-primary"
                          >
                            Войти
                          </button>
                        </form>
                      </div>
                      <div class="card-footer p-4">
                        <div class="text-center">
                          <span>Нет аккаунта?</span>
                          <a href="/signup">Регистрация</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Toastify"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
