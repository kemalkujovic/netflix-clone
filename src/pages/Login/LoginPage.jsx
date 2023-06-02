import React from "react";
import "./LoginPage.css";
import { useState } from "react";
import SignupScreen from "../Signup/SignupScreen";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const [signIn, setSignIn] = useState(false);
  const selector = useSelector((state) => state.user.user);
  return (
    <div className="loginPage">
      <div className="loginPage__background">
        <img
          className="loginScreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>
        <div className="loginPage__gradient" />
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimted files, TV progremmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              mebership.
            </h3>
            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
