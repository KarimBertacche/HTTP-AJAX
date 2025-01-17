import React from 'react';
import styled from 'styled-components';

const StyledPostForm = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #333;
    border-top: 3px solid #009FFF;

    form {
        display: flex;
        justify-content: space-around;
        width: 100%;       

        input {
            width: 25%;
            height: 30px;
            background: #009FFF;
            font-size: 1.5rem;
            font-weight: bold;
            border: 3px solid #009FFF;
            border-radius: 5px;
            text-align: center;
            outline: none;
            color: #fff;

            &::placeholder {
                font-weight: bold;
                color: #000;
            }
        }

        button {
            width: 150px;
            background-color: #009FFF;
            border: 3px solid #009FFF;
            border-radius: 5px;
            font-size: 1.3rem;
            font-weight: bold;
            cursor: pointer;
            outline: none;
            transition: all .3s ease-out;

            &:hover {
                background-color: #009FFF; 
                border: 3px solid #fff; 
                color: #fff;
                transform: translateY(-5px) scale(1.1);
            }

            &:active {
                transform: translateY(-3px);
            }
        }
    }

`;

// 

export default function PostForm(props) {
    return(
        <StyledPostForm>
            <form onSubmit={props.btn === 'ADD FRIEND' 
                                ? (event) => props.addFriendHandler(event) 
                                : (event) => props.updateFriendHandler(event)} >
                <input type="text" name="inputName" value={props.name} onChange={props.inputHandler} placeholder="Name"/>
                <input type="number" name="inputAge" value={props.age} onChange={props.inputHandler} placeholder="Age" min="1" max="110"/>
                <input type="email" name="inputEmail" value={props.email} onChange={props.inputHandler} placeholder="Email"/>
                <button type="submit">{props.btn}</button>
            </form>
        </StyledPostForm>
    );  
}