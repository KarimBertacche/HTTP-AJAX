import React from 'react';


export default function FriendCard(props) {
    return(
        <div>
            <p>{props.name} {props.age}</p>
            <span>{props.email}</span>
        </div>
    );
}