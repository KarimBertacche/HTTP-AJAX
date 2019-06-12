import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StylesNavBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    background-color: #333;
    z-index: 10;
    overflow-x: auto;
    border-bottom: 3px solid #009FFF;

    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }

    .nav-links {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        padding: 5px 30px;
        cursor: pointer;

        &.active {
            display: flex;
            align-items: center;
            background: #009FFF;
            height: 100%;
            color: #000;
        }
    }

`;

export default function NavBar(props) {
    return(
        <StylesNavBar>
            <NavLink className="nav-links" exact to="/">All</NavLink>
            {
                props.data.map( data => 
                    <NavLink key={data.id} className="nav-links" activeClassName="active" to={`/${data.name}/${data.id}`}>{data.name}</NavLink>
                )
            }       
        </StylesNavBar>
    );
} 