import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StylesFriendCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    min-width: 300px;
    height: 150px;
    background: linear-gradient(120deg , #333, #009FFF);
    margin: 20px auto;
    border: 3px solid #333;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #000;
    color: #ec2F4B;

    span {
        position: absolute;
        top: 2%;
        right: 2%;
        font-size: 1.5rem;

        &:hover {
            cursor: pointer;
        }
    }

    p {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 5px;
    }

    .email-link {
        text-decoration: none;
        color: #ec2F4B;
        font-weight: bold;

        &:hover {
            cursor: pointer;
        }
    }

    button {
        position: absolute;
        bottom: 0;
        padding: 5px 10px;
        border: 2px solid #333;
        border-bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        outline: none;

        &:hover {
            background-color: #ec2F4B;
            color: #000;   
        }
    }

`;


export default function FriendCard(props) {
    return(
        <StylesFriendCard>
            <span onClick={() => props.deleteFriendHandler(props.id)}>X</span>
            <p>{props.name} {props.age}</p>
            <Link className="email-link" to={props.email}>{props.email}</Link>
            <button onClick={() => props.updateFriendDetails(props.id)}>Update info</button>
        </StylesFriendCard>
    );
}