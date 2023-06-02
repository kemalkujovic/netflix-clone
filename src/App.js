import React, { useContext } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import ProfileScreen from "./pages/Profile/ProfileScreen";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
