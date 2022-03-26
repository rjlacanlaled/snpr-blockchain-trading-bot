import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TokenBalance = ({ token, balance, tokenSymbol }) => {
    return (
        <Container>
            <Token>{token || 'Select a token'}</Token>
            <Balance>
                {balance} {tokenSymbol}
            </Balance>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 5px 0 5px 0;
`;
const Token = styled.p`
    font-weight: 900;
    font-size: 0.8rem;
`;
const Balance = styled.p`
    font-weight: 400;
    font-size: 0.7rem;
`;

export default TokenBalance;
