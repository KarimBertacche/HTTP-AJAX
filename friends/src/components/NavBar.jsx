import React from 'react';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StylesNavBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding-right: 15px;
    
    nav {
        position: fixed;
        top: 0;
        left: 285px;
        width: 79%;
        display: flex;
        /* justify-content: space-around; */
        align-items: center;
        height: 70px;
        background-color: #333;
        overflow-x: auto;
        overflow-y: hidden;
        border-bottom: 3px solid #009FFF;
        

        &::-webkit-scrollbar {
            height: 0;
            width: 0;
        }

        .nav-links {
            display: flex;
            justify-content: center;
            width: 50px;
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
    }


`;

export default function NavBar(props) {
    return(
        <StylesNavBar>
            <SearchBar 
                search={props.search} 
                searchInputHandler={props.searchInputHandler}
                searchFriendHandler={props.searchFriendHandler}
            />      
            <nav>
                <NavLink className="nav-links" activeClassName="active" exact to="/" onClick={props.fetchDataHandler}>All</NavLink>
                {
                    props.data.map( data => 
                        <NavLink key={data.id} className="nav-links" activeClassName="active" to={`/${data.name}/${data.id}`}>{data.name}</NavLink>
                    )
                } 
            </nav>          
        </StylesNavBar>
    );
} 