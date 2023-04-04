import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";

function Header() {
  const { logout } = useAuth0();
  return (
    <header>
      <div className="weather-headline">
        <img src="./icon.svg" alt="weather-icon" className="weather-icon" />
        <h1 className="weather-text">Weather App</h1>

        <button className="logout-btn" onClick={() => logout()}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
