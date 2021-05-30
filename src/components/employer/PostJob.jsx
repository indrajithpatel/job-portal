import React, { useState, useReducer } from "react";
import firebase from "firebase";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { db } from "../../firebase/firebase";
import { options } from "../../utils/util";

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, jobTitle: action.data };
    case "description":
      return { ...state, jobDescription: action.data };
    case "requirement":
      return { ...state, jobRequirements: action.data };
    case "skills":
      return { ...state, jobSkills: action.data };
    case "companyName":
      return { ...state, company: action.data };
    case "contact":
      return { ...state, contact: action.data };
  }
}
function PostJob() {
  const [open, setOpen] = useState(false);
  const initialState = {
    jobTitle: "",
    jobDescription: "",
    jobRequirements: "",
    jobSkills: [],
    company: "",
    contact: "",
    freelancerIDs: [],
  };
  const [jobState, dispatch] = useReducer(reducer, initialState);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePostJob = (event) => {
    const data = {
      ...jobState,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("jobPosts")
      .add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="postjob">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Post a Job
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Job Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Job Title"
            type="text"
            required
            // value={jobState.jobTitle}
            onChange={(event) =>
              dispatch({ type: "title", data: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Job Description"
            type="text"
            required
            inputProps={{ maxLength: 60 }}
            // value={jobState.jobDescription}
            onChange={(event) =>
              dispatch({ type: "description", data: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="requirements"
            label="Job Requirements"
            type="text"
            required
            // value={jobState.jobRequirements}
            onChange={(event) =>
              dispatch({ type: "requirement", data: event.target.value })
            }
            fullWidth
            multiline
          />
          <Autocomplete
            multiple
            id="skills"
            required
            options={options}
            // value={}
            onChange={(e, value) => dispatch({ type: "skills", data: value })}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Skills"
                placeholder="Skills"
              />
            )}
          />
          <TextField
            margin="dense"
            id="companyName"
            label="Company Name"
            type="text"
            required
            //  value={jobState.companyName}
            onChange={(event) =>
              dispatch({ type: "companyName", data: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="contact"
            label="Contact"
            type="email"
            required
            //   value={jobState.contact}
            onChange={(event) =>
              dispatch({ type: "contact", data: event.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePostJob} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostJob;
