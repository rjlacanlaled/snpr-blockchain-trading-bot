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

const Container = styled.div``;
const Amount = styled.input``;
const MaxButton = styled.button``;

export default TokenInput;
