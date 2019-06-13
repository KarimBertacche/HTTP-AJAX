import React from 'react';
import styled from 'styled-components';

const StylesSearchBar = styled.div`
    width: 300px;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #333;
    z-index: 1000;  
    border-bottom: 3px solid #009FFF; 

    section {
        display: flex;
        align-items: center;
        width: 250px;
        height: 30px;
        border: 3px solid #009FFF;
        border-radius: 20px;
        overflow: hidden;
        position: fixed;
        left: 2%; 
    }

    input {
        width: 150px; 
        height: 30px;
        margin-top: -3px;
        margin-left: -5px;
        padding-left: 20px;
        font-size: 1.3rem;
        outline: none;
    }

    button {
        width: 80px;
        height: 30px;
        background-color: #009FFF;
        margin-top: -3px;
        border: none;
        color: #000;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        outline: none;

        &:hover {
            color: #fff;
        }
    }

`;


export default function SearchBar(props) {
    return(
        <StylesSearchBar>
            <section>
                <input 
                    type="text"
                    value={props.search}
                    onChange={(event) => props.searchInputHandler(event)}
                /> 
                <button onClick={props.searchFriendHandler}>Search</button>
            </section>  
        </StylesSearchBar>
    )
} 