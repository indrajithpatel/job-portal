import { Height } from "@material-ui/icons";
import React from "react";
import FreelancerHeader from "./FreelancerHeader";
import UserDetails from "./UserDetails";
const style = {
  backgroundImage :`url("https://img.wallpapersafari.com/desktop/1920/1080/36/70/95iSO4.jpg")`,
  minHeight: "100vh"
}
function UserProfile() {

  return (
    <div style={style}>
      <FreelancerHeader></FreelancerHeader>
      <UserDetails></UserDetails>
    </div>
  );
}

export default UserProfile;
