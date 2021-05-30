import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import JobListItem from "./JobListItem";
import "./JobListItem";
import "./FreelancerJobList.css";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import {useParams} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    background: "white",
    margin: "auto",
    width: "68%",
    marginTop: "30px",
  },
});

function FreelancerJobList({ selectedSkill }) {
  //const jobs = []
  const [jobs, setJobs] = useState([]);
  const [backupJobs, setBackupJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([0, 3]);
  const classes = useStyles();
  const {freelancerID} = useParams();
  const ref = useRef(null);

  useEffect(() => {
    const unSubscribe = db.collection("jobPosts").orderBy("timestamp",'desc').onSnapshot((snapshot) => {
      const values = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const initialValues = values.filter((item, index) => {
        const [start, end] = range;
        return index >= start && index <= end;
      });
      setJobs(initialValues);
      setBackupJobs(values);
    });

    return unSubscribe;
  }, []);

  //Used to handle Filtering based on Skills
  useEffect(() => {
    if(backupJobs.length > 0) {
    const items = backupJobs.filter(({ id, data: { jobSkills } }) =>
      selectedSkill.every((skill) => jobSkills.includes(skill))
    );
    const initialValues = items.filter((item, index) => {
      const [start, end] = range;
      return index >= start && index <= end;
    });
    ref.current = initialValues;
    setJobs(initialValues);
  }
  }, [selectedSkill]);

  //Use to handle Page Navigation
  useEffect(() => {
    //Special Case handling if any filtering is applied
    if(selectedSkill.length > 0) {
      const items = ref.current.filter((item, index) => {
        const [start, end] = range;
        return index >= start && index <= end;
      });
      setJobs(items);
    }else{
      if(backupJobs.length > 0) {
        const items = backupJobs.filter((item, index) => {
          const [start, end] = range;
          return index >= start && index <= end;
        });
        setJobs(items);
      }
    }
    
  }, [page]);

  //Handle Pagination. Update the start and end
  const handlePagination = (event, pageNum) => {
    setRange((previousState) => {
      let [start, end] = previousState;
      if (pageNum-page > 0) {
        start = start + 4 * (pageNum-page);
        end = end + 4 * (pageNum-page);
        return [start, end];
      } else {
        start = start - 4;
        end = end - 4;
        return [start, end];
      }
    });
    setPage(pageNum);
  };

  const applyForJob = (jobID) =>{
    let jobIndex = jobs.findIndex((item, index) => item.id === jobID);
    let job = jobs[jobIndex];
    const uniqueIDs = new Set([...job.data.freelancerIDs, freelancerID])
    const data = {
      freelancerIDs : [...uniqueIDs]
    }
    db.collection("jobPosts").doc(jobID).update(data).then(() => {
      jobs[jobIndex].data.freelancerIDs = data.freelancerIDs
      setJobs([...jobs]);
    })
    
  }

  return (
    <div className="card-row">
      {jobs.map(
        ({ id, data: { jobTitle, company, jobDescription, jobSkills, freelancerIDs  } }) => {
          return (
            <JobListItem
              key={id}
              jobID ={id}
              jobTitle={jobTitle}
              company={company}
              jobDescription={jobDescription}
              jobSkills={jobSkills}
              jobApplied={
                freelancerIDs.includes(freelancerID) ? "Applied" : "Apply"
              }
              applyForJob={applyForJob}
              type="freelancer"
            ></JobListItem>
          );
        }
      )}
      <Pagination
        classes={{ root: classes.root }}
        count={10}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
      />
    </div>
  );
}
export default FreelancerJobList;
