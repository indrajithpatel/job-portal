import React from "react";
import "./JobListItem.css";

function JobListItem({ jobID, jobTitle, company, jobSkills, type, jobApplied, applyForJob, candidates, openCandidateProfile }) {
 
  return (
    <div className="card">
      <div className="card__leftSection">
        <span className="card__title">
          {jobTitle}
        </span>
        <p className="card__company">{company.toUpperCase()}</p>
        <p className="card__location">Bangalore Urban, Karnataka, India</p>
        <p className="card__skills">
          <em>Skills:</em>{" "}
          {jobSkills.map((skill, index) => (
            <span key={skill} className="skill-pad">
              {skill},
            </span>
          ))}
        </p>
      </div>
      <div className="card__rightSection">
        {type === "freelancer" ? (
          <button
            type="button"
            data-job-id={jobID}
            onClick={(event) => {
              const id = event.target.getAttribute("data-job-id");
              applyForJob(id);
            }}
            className="btn btn-primary btn-sm apply-button"
          >
            {jobApplied}
          </button>
        ) : (
          <button type="button" className="card__candidates" data-job-id={jobID} onClick={(event) => {
            const id = event.target.getAttribute("data-job-id");
            openCandidateProfile(id); 
          }}>
            Applicants <br/><br/>
            {candidates}
          </button>
        )}
      </div>
    </div>
  );
}

export default JobListItem;
