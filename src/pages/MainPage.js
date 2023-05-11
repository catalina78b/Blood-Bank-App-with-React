import { Link } from 'react-router-dom';
import '../styling/MainPage.css';

function MainPage() {
  return (
    <div className="main-page-container">
      <div className="card-container">
        <h1>WELCOME TO BLOOD BANK</h1>
        <p>Please log in or create an account to continue.</p>
        <div className="button-container">
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

