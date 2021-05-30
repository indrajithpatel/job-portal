import React from 'react';
import "./HeaderOptions.css"

function HeaderOptions({Icon, title, signOut}) {
    return (
        <div className="headerOption" onClick={signOut}>
            {Icon && <Icon className="headerOption__icons"/>}
            <span className ="headerOption__title">{title}</span>
        </div>
    )
}

export default HeaderOptions
