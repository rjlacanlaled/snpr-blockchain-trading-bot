import { useState } from 'react';
import styled from 'styled-components';

const TokenBalance = ({ token, balance, onTokenClick }) => {
    const handleTokenClick = () => {
        onTokenClick();
    };

    return (
        <Container>
            <Token onClick={handleTokenClick}>{token}</Token>
            <Balance>{balance}</Balance>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Token = styled.button``;
const Balance = styled.p``;

export default TokenBalance;
