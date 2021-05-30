import React , {useState} from 'react'
import {options} from "../../utils/util"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./FreelancerFilterFacet.css"

function FreelancerFilterFacet({filterSkills}) {
       return (
        <div className="filterfacet">
            <div className="filterfacet__skills">
            <h4>Skills</h4>
            <div className="filterfacet__skilllist">
            {
                options.map((item) => {
                   return(<FormControlLabel
                    key={item}
                    value={item}
                    control={<Checkbox name={item} color="primary" onChange={(event) => {
                        console.log(event.target.checked);
                        filterSkills(event.target.name, event.target.checked);
                    }
                    }/>}
                    label={item}
                    labelPlacement="end"
                  />)
                })
            }
            </div>
            </div>
        </div>
    )
}

export default FreelancerFilterFacet
