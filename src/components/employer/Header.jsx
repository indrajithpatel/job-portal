import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";
import PostJob from "./PostJob";
import {useHistory} from "react-router-dom"
import { useGlobalContext } from "../contexts/useGlobalContext";

function Header({handleSearchValue}) {
  const [state, dispatch] = useGlobalContext();
  const history = useHistory();
  const navigateHome = () =>{
      history.push("/");
  }
  const signOut = () => {
    history.push("/");
    window.location.reload();
  }
  return (
    <div className="header">
      <div className="header__left">
        <img alt="" onClick={navigateHome} src="https://vainfotech.com/img/jobsportal-development.png" />
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" onChange= {(event) => {
           // if(event.key === "Enter") {
            console.log(event.target.value)
            handleSearchValue(event.target.value)}
        //  }
          }/>
      </div>
      </div>
     
      <div className="header__right">
        <PostJob></PostJob>
        <HeaderOptions Icon={HomeIcon} title="Home"></HeaderOptions>
        <HeaderOptions Icon={ForumIcon} title="Messages"></HeaderOptions>
        <HeaderOptions Icon={NotificationsIcon} title="Notifications"></HeaderOptions>
        <HeaderOptions Icon={AccountCircleIcon} title={state.user.userName}></HeaderOptions>
        <HeaderOptions Icon={PowerSettingsNewIcon} title="SignOut" signOut={signOut}></HeaderOptions>
        
      </div>
    </div>
  );
}

export default Header;
