import React from 'react'
import { useHistory } from 'react-router'

function NotFound() {
    const history = useHistory();
    const gotoHomePage = () => {
        history.push("/")
    }
    return (
        <div>
            <p> This is unexpected , Please <button onClick={gotoHomePage}>click here</button> from here</p>
            
        </div>
    )
}

export default NotFound
