import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';

const PageContainer = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <Navbar navigate={navigate} homePage={false} />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
