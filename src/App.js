import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import CityList from "./Components/CityList";
import CardDetail from "./Components/CardDetail/CardDetail";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress size={200} />
        </div>
      </>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<CityList />} />
            <Route path="/cardDetails" element={<CardDetail />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <button onClick={() => loginWithRedirect()} className="login-btn">
            Log In
          </button>
        </div>
      )}
    </>
  );
}

export default App;
