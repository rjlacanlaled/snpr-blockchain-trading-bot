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
    justify-content: space-between;
`;
const Token = styled.p``;
const Balance = styled.p``;

export default TokenBalance;
