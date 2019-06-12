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

    form {
        display: flex;
        justify-content: space-around;
        width: 100%;       

        input {
            width: 25%;
            height: 30px;
            font-size: 1.5rem;
            border-radius: 5px;
            text-align: center;
            outline: none;
        }

        button {
            width: 150px;
            border-radius: 5px;
            font-size: 1.3rem;
            cursor: pointer;

            &:hover {
                background-color: dodgerblue;  
            }
        }
    }

`;

export default function PostForm(props) {
    return(
        <StyledPostForm>
            <form action="/" method="post">
                <input type="text" value={props.name} onChange={props.nameInputHandler} placeholder="Name"/>
                <input type="text" value={props.age} onChange={props.ageInputHandler} placeholder="Age"/>
                <input type="email" value={props.email} onChange={props.emailInputHandler} placeholder="Email"/>
                <button>Add Friend</button>
            </form>
        </StyledPostForm>
    );  
}