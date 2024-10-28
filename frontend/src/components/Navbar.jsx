const handleExit = (navigate) => () => {
  localStorage.clear();
  navigate('/login');
};

const Navbar = ({ navigate, homePage }) => {
  const exitButton = (
    <button type="button" className="btn btn-primary" onClick={handleExit(navigate)}>
      Выйти
    </button>
  );
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {homePage && exitButton}
      </div>
    </nav>
  );
};

export default Navbar;
