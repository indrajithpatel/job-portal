import React, {useState} from 'react'
import Header from './Header'
import Jobs from './Jobs'
import "./Employer.css"

function Employer() {
    const [searchValue, setSearchValue] = useState("");
      const handleSearchValue = (searchText) =>{
        setSearchValue(searchText);
        console.log(searchText);
        console.log(searchValue)
      }
       return (
        <div className="employer">
            <Header handleSearchValue = {handleSearchValue}></Header>
            <Jobs searchValue = {searchValue}></Jobs>
        </div>
    )
}

export default Employer
