import React, { useState, useEffect } from "react";
import { Snackbar, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { options } from "../../utils/util";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase/firebase";
import "./UserDetails.css";
import firebase from "firebase";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    marginRight: "22px",
  },
});

const initialState = {
  firstName: "",
  firstNameError: false,
  lastName: "",
  lastNameError: false,
  contact: "",
  contactError: false,
  email: "",
  emailError: false,
  currentRole: "",
  currentRoleError: false,
  company: "",
  companyError: false,
  location: "",
  locationError: false,
  experience: "",
  experienceError: false,
  skills: [],
  skillsError: false,
  githubProfile: "",
  githubProfileError: false,
  githubRepositories: [],
};

function UserDetails() {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [userCreated, setUser] = useState({ user: false });
  const [currentUser, setCurrenUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    initialState.firstNameError = true;
    initialState.lastNameError = true;
    initialState.contactError = true;
    initialState.emailError = true;
    initialState.currentRoleError = true;
    initialState.companyError = true;
    initialState.locationError = true;
    initialState.experienceError = true;
    initialState.skillsError = true;
    initialState.githubProfileError = true;
  }, []);

  useEffect(() => {
    if(userCreated.user) {
    const unSubscribe = db.collection("freelanceUsers").orderBy("timestamp",'desc').onSnapshot((snapshot) => {
      const values = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const activeUser = values.shift();
      setCurrenUser(activeUser);
    });

    return unSubscribe;
  }
  }, [userCreated]);

  const linkAccount = () => {
    const userName = initialState.githubProfile.split("/").pop();
    const makeAPICall = async () => {
      const repos = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );
      const data = repos.data;
      const extractInfo = data.map((item) => {
        return {
          name: item.name,
          id: item.id,
        };
      });
      initialState.githubRepositories = extractInfo;
      setState({ ...initialState, githubRepositories: extractInfo });
    };
    makeAPICall();
  };

  const handleFieldChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    switch (key) {
      case "githubProfile": {
        if (value.includes("github.com")) {
          initialState["githubProfile"] = value;
          initialState["githubProfileError"] = "";
        } else {
          initialState["githubProfileError"] = true;
        }
        break;
      }
      case "firstName": {
        if (value) {
          initialState["firstName"] = value;
          initialState["firstNameError"] = false;
        } else {
          initialState["firstNameError"] = true;
        }
        break;
      }

      case "lastName": {
        if (value) {
          initialState["lastName"] = value;
          initialState["lastNameError"] = false;
        } else {
          initialState["lastNameError"] = true;
        }
        break;
      }

      case "contact": {
        const phoneNumber =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (phoneNumber.test(value)) {
          initialState["contact"] = value;
          initialState["contactError"] = false;
        } else {
          initialState["contactError"] = true;
        }
        break;
      }

      case "email": {
        if (value.includes("@")) {
          initialState["email"] = value;
          initialState["emailError"] = false;
        } else {
          initialState["emailError"] = true;
        }
        break;
      }

      case "currentRole": {
        if (value) {
          initialState["currentRole"] = value;
          initialState["currentRoleError"] = false;
        } else {
          initialState["currentRoleError"] = true;
        }
        break;
      }

      case "company": {
        if (value) {
          initialState["company"] = value;
          initialState["companyError"] = false;
        } else {
          initialState["companyError"] = true;
        }
        break;
      }

      case "location": {
        if (value) {
          initialState["location"] = value;
          initialState["locationError"] = false;
        } else {
          initialState["locationError"] = true;
        }
        break;
      }

      case "experience": {
        const num = Number(value);
        if (!Number.isNaN(num)) {
          initialState["experience"] = value;
          initialState["experienceError"] = false;
        } else {
          initialState["experienceError"] = true;
        }
      }

      case "githubProfile": {
        if (value) {
          initialState["githubProfile"] = value;
          initialState["githubProfileError"] = false;
        } else {
          initialState["githubProfileError"] = true;
        }
        break;
      }
    }
  };

  const handleSkills = (value) => {
      if(value.length > 0) {
        initialState["skills"] = value;
        initialState["skillsError"] = false;
      }else{
        initialState["skillsError"] = true
      }
      
  }

  const formValidation = (event) => {
    event.preventDefault();
    setState({ ...initialState });
    if (
      !initialState.firstNameError &&
      !initialState.lastNameError &&
      !initialState.contactError &&
      !initialState.locationError &&
      !initialState.experienceError &&
      // !initialState.skillsError &&
      !initialState.githubProfileError
    ) {
      let {
        firstName,
        lastName,
        contact,
        company,
        location,
        experience,
        skills,
        githubProfile,
        githubRepositories,
        email
      } = initialState;
      let data = {
        firstName,
        lastName,
        contact,
        company,
        location,
        experience,
        skills,
        githubProfile,
        githubRepositories,
        email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      console.log(data);
      db.collection("freelanceUsers")
        .add(data)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setUser({ ...userCreated, user: true });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      //history.push('/freelancer');
    }
  };
  const exploreJobs = (event) => {
    console.log(event);
    console.log(currentUser);
    history.push(`/freelancer/${currentUser.id}`);
  
  };

  return (
    <div className="userdetails">
      <form className="userdetails__form" onSubmit={formValidation}>
        <h3>Welcome , Setup your Profile</h3>
        <div className="userdetails--horizontal">
          <TextField
            classes={{ root: classes.root }}
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.firstNameError ? "Enter Valid First Name" : ""}
            error={state.firstNameError ? true : false}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.lastNameError ? "Enter Valid Last Name" : ""}
            error={state.lastNameError ? true : false}
          />
        </div>
        <div className="userdetails--horizontal">
          <TextField
            classes={{ root: classes.root }}
            margin="dense"
            id="contact"
            label="Contact Number"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.contactError ? "Enter Valid Contact Number" : ""}
            error={state.contactError ? true : false}
          />
          <TextField
            margin="dense"
            id="email"
            label="Personal Email ID"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.emailError ? "Enter Valid Email ID" : ""}
            error={state.emailError ? true : false}
          />
        </div>
        <TextField
          margin="dense"
          id="currentRole"
          label="Current Role"
          type="text"
          onChange={handleFieldChange}
          fullWidth
          multiline
          helperText={state.currentRoleError ? "Enter Valid Role" : ""}
          error={state.currentRoleError ? true : false}
        />
        <div className="userdetails--horizontal">
          <TextField
            classes={{ root: classes.root }}
            margin="dense"
            id="company"
            label="Current Company"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            multiline
            helperText={state.companyError ? "Enter Valid Company Details" : ""}
            error={state.companyError ? true : false}
          />

          <TextField
            classes={{ root: classes.root }}
            margin="dense"
            id="location"
            label="Location"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.locationError ? "Enter Valid Location" : ""}
            error={state.locationError ? true : false}
          />

          <TextField
            margin="dense"
            id="experience"
            label="Experience in Years"
            type="text"
            onChange={handleFieldChange}
            fullWidth
            helperText={state.experienceError ? "Enter Valid Experience" : ""}
            error={state.experienceError ? true : false}
          />
        </div>
        <Autocomplete
          multiple
          id="skills"
          options={options}
          // value={}
          onChange={(event, value) => {
            handleSkills(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Add your Skills"
              placeholder="Skills"
            />
          )}
        />
        <div className="userdetails--horizontal">
          <TextField
            classes={{ root: classes.root }}
            margin="dense"
            id="githubProfile"
            label="Link your GitHub Profile"
            type="text"
            fullWidth
            multiline
            onChange={handleFieldChange}
            helperText={
              state.githubProfileError ? "Enter Valid Github Profile" : ""
            }
            error={state.githubProfileError ? true : false}
          />
          <input
            type="button"
            className="userdetails__linkaccount"
            onClick={linkAccount}
            value="Link Account"
          />
        </div>
        <div className="userdetails__repositories">
          {state.githubRepositories.map((item) => {
            return <p key={item.id}>{item.name} </p>;
          })}
        </div>
        <input type="submit" className="userdetails__submit" value="Save" />
        {userCreated.user && (
          <input
            type="button"
            className="userdetails__explore"
            value="Explore Jobs"
            onClick={exploreJobs}
          />
        )}
        {userCreated.user && (
           <Snackbar open={userCreated.user} autoHideDuration={3000}  
           anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}>
           <Alert severity="success">
             Profile Updated SuccessFully
           </Alert>
         </Snackbar>
        )}
      </form>
    </div>
  );
}

export default UserDetails;
