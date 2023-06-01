import React, { useEffect } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./pages/Profile/ProfileScreen";
import {
  Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
function App() {
  // const user = useSelector((state) => state.user.user);
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
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

    return () => {
      unsub();
    };
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeScreen />} />
            <Route
              path="login"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />

            <Route path="profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
