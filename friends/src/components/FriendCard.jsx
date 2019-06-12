import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StylesFriendCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    min-width: 300px;
    height: 150px;
    margin: 20px auto;
    border: 3px solid #333;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #000;

    p {
        font-size: 2rem;
        margin: 0;
    }

    .email-link {
        text-decoration: none;
        color: #333;

        &:hover {
            cursor: pointer;
        }
    }

`;


export default function FriendCard(props) {
    return(
        <StylesFriendCard>
            <p>{props.name} {props.age}</p>
            <Link className="email-link" href={props.email}>{props.email}</Link>
        </StylesFriendCard>
    );
}