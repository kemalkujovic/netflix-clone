import React, { useEffect } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./pages/Profile/ProfileScreen";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Router,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  // const user = useSelector((state) => state.user.user);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      // Logged in
      dispatch(
        login({
          uid: userAuth.uid,
          email: userAuth.email,
        })
      );
    } else {
      // Logged out
      dispatch(logout());
    }
  });

  function PrivateRoute() {
    const isAuthenticated = useSelector((state) => state.user.user);

    return isAuthenticated ? (
      <Route />
    ) : (
      <Navigate to="/login" replace={true} />
    );
  }

  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
      </Router>
    </div>
  );
}
export default App;
