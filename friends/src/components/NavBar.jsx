import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar(props) {
    return(
        <header>
            {
                props.data.map( data => 
                    <Link to={`/${data.name}/${data.id}`}>{data.name}</Link>
                )
            }       
        </header>
    );
} 