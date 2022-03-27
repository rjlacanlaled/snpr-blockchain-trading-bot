import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';
import PageSelection from './PageSelection';

const Header = () => {
    const { connect, disconnect, account, balance, connected, canConnect } = useBlockchainNetwork();

    const handleConnectWallet = async () => {
        if (!canConnect) return;
        account ? disconnect() : connect();
    };

    return (
        <Main>
            <Container>
                <Title>Snipr</Title>
                <BalanceContainer connected={connected}>
                    <ConnectWalletButton onClick={handleConnectWallet} disabled={!canConnect}>
                        {canConnect ? !account ? 'connect wallet' : `disconnect: 0x...${account.slice(account.length - 4)}` : 'install metamask to connect wallet...'}
                    </ConnectWalletButton>
                    <Balance> {connected && `Balance: ${balance} BNB`}</Balance>
                </BalanceContainer>
            </Container>
            <PageSelection />
        </Main>
    );
};

const Main = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    width: 100%;

    background-color: #ffffff;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 50px;
    width: 100%;
    padding: 10px 3px 10px 20px;

    border-bottom: 1px solid lightgray;
`;


const ConnectWalletButton = styled.button`
    max-height: 30px;
    padding: 5px 10px 5px 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: hsl(184, 75%, 60%);

    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: hsl(184, 100%, 60%);
    }

    &:disabled {
        background-color: lightgray;
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
    font-size: 0.9rem;
    color: white;
    font-weight: 900;
`;
const Title = styled.p`
    font-weight: 900;
    font-size: 1.2rem;
`;

export default Header;
