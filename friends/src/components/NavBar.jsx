import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StylesNavBar = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #333;

    .nav-links {
        text-decoration: none;
        color: #fff;
        padding: 10px 30px;
        cursor: pointer;

        &.active {
            display: flex;
            align-items: center;
            background-color: #fff;
            height: 100%;
            color: #333;
        }
    }

`;

export default function NavBar(props) {
    return(
        <StylesNavBar>
            <NavLink className="nav-links" exact to="/">All</NavLink>
            {
                props.data.map( data => 
                    <NavLink className="nav-links" activeClassName="active" to={`/${data.name}/${data.id}`}>{data.name}</NavLink>
                )
            }       
        </StylesNavBar>
    );
} 