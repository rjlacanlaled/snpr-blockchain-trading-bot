import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';

const Header = () => {
    const { connect, disconnect, account, balance } = useBlockchainNetwork();

    const [connected, setConnected] = useState(false);

    const handleConnectWallet = async () => {
        if (account) {
            disconnect();
            setConnected(false);
        } else {
            connect();
            setConnected(true);
        }
    };

    return (
        <Container>
            <ConnectWalletButton onClick={handleConnectWallet}>
                {!account ? 'connect wallet' : `disconnect: ${account}`}
            </ConnectWalletButton>
            <Balance>{connected && `${balance} BNB`}</Balance>
        </Container>
    );
};

const Container = styled.div`
    display: flex;

    position: fixed;
    top: 0;
`;
const ConnectWalletButton = styled.button``;
const Balance = styled.p``;

export default Header;
