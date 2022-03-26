import { useState } from 'react';
import styled from 'styled-components';

const TokenInput = ({ onInputChange, value, maxAmount }) => {
    return (
        <Container>
            <Amount onChange={e => onInputChange(e.target.value)} value={value} />
            <MaxButton onClick={e => onInputChange(maxAmount)}>Max</MaxButton>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;

    display: flex;
    gap: 5px;
`;
const Amount = styled.input`
    padding: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    min-height: 50px;
    min-width: 250px;
    background-color: #EDEAF4;
`;
const MaxButton = styled.button`
    width: 100%;
    padding: 0 5px 0 5px;
    font-size: 0.7rem;
    border-radius: 5px;
    border: 1px solid lightgray;
    cursor: pointer;
`;

export default TokenInput;
