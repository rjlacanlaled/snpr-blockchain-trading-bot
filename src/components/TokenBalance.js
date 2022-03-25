import { useState } from 'react';
import styled from 'styled-components';

const TokenBalance = ({ userAddress = 'none' }) => {
    const [token, setToken] = useState('');
    const [address, setAddress] = useState(userAddress);

    return (
        <Container>
            <Token>Token Name</Token>
            <Balance>Token Balance</Balance>
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
