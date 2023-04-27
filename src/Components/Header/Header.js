import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";

function Header(props) {
  const { logout } = useAuth0();
  return (
    <header className="wether-header">
      <div className="user-name">
        <p>{props.userName}</p>
      </div>
      <div className="weather-headline">
        <img src="./icon.svg" alt="weather-icon" className="weather-icon" />
        <h1 className="weather-text">Weather App</h1>
      </div>
      <button className="logout-btn" onClick={() => logout()}>
        Log Out
      </button>
    </header>
  );
}

export default Header;
