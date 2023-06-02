import React from "react";
import "./ProfileScreen.css";
import Nav from "../../components/Nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user?.email}</h2>
            <div className="profileScreen__plans">
              <button
                onClick={logoutHandler}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
