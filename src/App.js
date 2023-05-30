import React, { useEffect } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { auth } from "./firebase";
function App() {
  const user = null;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        console.log(userAuth);
      } else {
        // Logged out
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {!user ? (
              <Route path="/login" element={<LoginPage />} />
            ) : (
              <Route index element={<HomeScreen />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
