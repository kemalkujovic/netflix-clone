import React from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
function App() {
  const user = null;

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
