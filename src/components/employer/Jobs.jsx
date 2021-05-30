import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/firebase";
import JobListItem from "../freelancer/JobListItem"
import ApplicantsDetails from "./ApplicantsDetails";
import "./Jobs.css"

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const unSubscribe = db.collection("jobPosts").orderBy("timestamp",'desc').onSnapshot((snapshot) => {
      const values = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(values);
      setJobs(values);
    });

    return unSubscribe;
  }, []);

  useEffect(() => {
    db.collection("freelanceUsers").get().then((res) => {
      ref.current = [];
      res.forEach((doc) => {
        ref.current.push({
            id : doc.id, 
            data: doc.data()
          })
      });
  });
  },[])

  const openCandidateProfile = async (id) => {
    const applicants = jobs.filter((item) => item.id === id)[0].data.freelancerIDs;
    if(applicants.length > 0) {
      const data = ref.current.filter((item) => applicants.includes(item.id));
      ref1.current = data;
      setOpen(true);
    }
  }

  const closeCandidateProfile = () => {
    setOpen(false);
  }
 
  return (
    <div className="jobsContainer">
      <h4 id="jobsContainer__title">Jobs Posted ({jobs.length})</h4>
      {jobs.map(({id , data : {jobTitle, company, jobDescription, jobSkills,freelancerIDs }}) => {
        return  <JobListItem
        key={id}
        jobTitle={jobTitle}
        company={company}
        jobDescription={jobDescription}
        jobSkills={jobSkills}
        candidates = {freelancerIDs.length}
        jobID ={id}
        openCandidateProfile = {openCandidateProfile}
        type="employer"
      ></JobListItem>
      })}
      {open ? <ApplicantsDetails rows={ref1.current} open={open} closeCandidateProfile={closeCandidateProfile}></ApplicantsDetails> : ""}
    </div>
  );
}

export default Jobs;
