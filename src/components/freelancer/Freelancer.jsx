import React , {useState} from 'react'
import FreelancerFilterFacet from './FreelancerFilterFacet'
import FreelancerHeader from './FreelancerHeader'
import FreelancerJobList from './FreelancerJobList'
import "./Freelancer.css"


const style = {
    display: "flex",
    width: "60%",
    margin: "auto",
    border: "0.1px solid lightgrey",
    boxShadow: "0px 14px 80px rgb(34 35 58 / 20%)",
    overflow : "hidden",
    height : "89vh",
    marginTop : "5px",
    background : "white",
    overflowY: "scroll"
}
function Freelancer() {
    const [state, setState] = useState([]);
    const filterSkills = (value, bChecked) => {
        if(bChecked) {
        setState((oldArray) => [...oldArray, value]);
    } else{
        const items = state.filter((item) => item !== value);
        setState(items)
    }
    }
    return (
        <div className="freelancer">
            <FreelancerHeader></FreelancerHeader>
            <div style={style}>
            <FreelancerFilterFacet filterSkills={filterSkills}></FreelancerFilterFacet>
            <FreelancerJobList selectedSkill={state}></FreelancerJobList>
            </div>
        </div>
    )
}

export default Freelancer
