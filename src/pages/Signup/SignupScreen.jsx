import React from "react";
import "./SignupScreen.css";
import { useRef } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/userSlice";

const SignupScreen = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const dispatch = useDispatch();

  const register = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.meessage);
    }
  };

  const signIn = async (e) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
        })
      );
      navigate("/");
    } catch (error) {
      alert(error.meessage);
    }
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
