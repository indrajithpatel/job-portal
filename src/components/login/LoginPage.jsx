import React from "react";
import { TextField, Button } from "@material-ui/core";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useGlobalContext } from "../contexts/useGlobalContext";

function LoginPage() {
  const [state ,dispatch] = useGlobalContext();
  const history = useHistory();
  const login = () => {
    if (state.user.userName !== "" && state.user.password !== "") {
       dispatch({type : "SUCCESS"});
      if (state.user.loginAs === "Freelancer") {
        history.push("/userProfile");
      } else {
        history.push("/employer");
      }
    } else {
      dispatch({type : "FAILURE"}); 
    }
  };
  return (
    <div className="loginpage">
      <div className="outer">
        <div className="inner">
          <form>
            <h4>SIGN IN</h4>
            <TextField
              margin="dense"
              id="Username"
              label="Username"
              type="text"
              onChange={(event) => dispatch({ type: "CHANGE_VALUE", field :"userName" ,value: event.target.value })}
              fullWidth
            />

            <TextField
              margin="dense"
              id="Password"
              label="Password"
              type="password"
              onChange={(event) => dispatch({ type: "CHANGE_VALUE", field :"password" ,value: event.target.value })}
              fullWidth
            />

            <RadioGroup
              name="login"
              value={state.user.loginAs}
              onChange={(event) => dispatch({ type: "CHANGE_VALUE", field :"loginAs" ,value: event.target.value })}
            >
              <FormControlLabel
                value="Employer"
                control={<Radio />}
                label="Employer"
              />
              <FormControlLabel
                value="Freelancer"
                control={<Radio />}
                label="Freelancer"
              />
            </RadioGroup>
            {!state.user.loginSuccess && (
              <span className="error-form">
                Please Enter Proper Login Credentials
              </span>
            )}
            <Button variant="contained" color="primary" onClick={() => login()}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
