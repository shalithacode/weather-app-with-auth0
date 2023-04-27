import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import CityList from "./Components/CityList/CityList";
import CardDetail from "./Components/CardDetail/CardDetail";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const { user } = useAuth0();

  if (isLoading) {
    return (
      <>
        <div className="loading-image-container">
          <CircularProgress size={200} />
        </div>
      </>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="App">
          <Header userName={`Hi, ${user.name.split(" ")[0]}`} />

          <Routes>
            <Route path="/" element={<CityList />} />
            <Route path="/cardDetails" element={<CardDetail />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="loading-image-container">
          <button onClick={() => loginWithRedirect()} className="login-btn">
            Log In
          </button>
        </div>
      )}
    </>
  );
}

export default App;
