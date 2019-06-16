import React from 'react';
import Spinner from '../Infinity2.svg';
import styled from 'styled-components';

const StylesLoadingPage = styled.div`
    img {
        width: 300px;
        height: 300px;
    }

    p {
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
    }

`;

export default function LoadingPage() {
    return(
        <StylesLoadingPage>
            <img src={Spinner} alt="spinner"/>
            <p>Data is still fetching ...</p>
        </StylesLoadingPage>
    )
}