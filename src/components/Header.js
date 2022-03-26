import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';

const Header = () => {
    const { connect, disconnect, account, balance, connected } = useBlockchainNetwork();

    const handleConnectWallet = async () => {
        account ? disconnect() : connect();
    };

    return (
        <Container>
            <Title>Snipr</Title>
            <BalanceContainer connected={connected}>
                <ConnectWalletButton onClick={handleConnectWallet}>
                    {!account ? 'connect wallet' : `disconnect: ${account}`}
                </ConnectWalletButton>
                <Balance> {connected && `Balance: ${balance} BNB`}</Balance>
            </BalanceContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    top: 0;

    background-color: #ffffff;
    min-height: 50px;
    width: 100%;
    padding: 0 20px 0 20px;
`;
const ConnectWalletButton = styled.button`
    max-height: 30px;
    padding: 5px 10px 5px 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: hsl(184, 75%, 60%);
    cursor: pointer;

    &:hover {
        background-color: hsl(184, 100%, 60%);
    }
`;

const BalanceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${({ connected }) => (connected ? '#663AAF' : 'transparent')};
    padding: 5px;
    border: 1px solid white;
    border-radius: 5px;
`;
const Balance = styled.p`
    font-size: 0.8rem;
    color: white;
    font-weight: 900;
`;
const Title = styled.p`
    font-weight: 900;
    font-size: 1.2rem;
`;

export default Header;
