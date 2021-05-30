import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderOptions from "../employer/HeaderOptions";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import "./FreelancerHeader.css";
import { useHistory } from "react-router";
import { useGlobalContext } from "../contexts/useGlobalContext";

function FreelancerHeader() {

  const [state, dispatch] = useGlobalContext();
  const history = useHistory();
  const navigateHome = () => {
    history.push("/");
  };
  const signOut = () => {
    history.push("/");
    window.location.reload();
  }
  return (
    <div className="freelancerheader">
      <div className="freelancerheader__left">
        <img
          alt=""
          onClick={navigateHome}
          src="https://vainfotech.com/img/jobsportal-development.png"
        />
      </div>

      <div className="freelancerheader__right">
        <HeaderOptions Icon={HomeIcon} title="Home"></HeaderOptions>
        <HeaderOptions Icon={ForumIcon} title="Messages"></HeaderOptions>
        <HeaderOptions
          Icon={NotificationsIcon}
          title="Notifications"
        ></HeaderOptions>
        <HeaderOptions Icon={AccountCircleIcon} title={state.user.userName}></HeaderOptions>
        <HeaderOptions Icon={PowerSettingsNewIcon} title="SignOut" signOut={signOut}></HeaderOptions>
      </div>
    </div>
  );
}

export default FreelancerHeader;
