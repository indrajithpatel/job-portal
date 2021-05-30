import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import "./ApplicantsDetails.css"

function ApplicantsDetails({rows, open, closeCandidateProfile}) {
    const handleClose = () => {
        closeCandidateProfile();
    }
    return (
        <div>
        <Dialog
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          Applicants Details
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Applicant Name</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Current Company</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Skills</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({id , data : {firstName, lastName, contact, experience, company, skills, location, email }}) => (
                  <TableRow key={id}>
                    <TableCell>{`${firstName} ${lastName}`}</TableCell>
                    <TableCell>{contact}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{experience}</TableCell>
                    <TableCell>{company}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{skills.map((item)=>{
                      return <div>{item},</div>
                    })},</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}> 
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default ApplicantsDetails
