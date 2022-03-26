import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';

const Header = () => {
    const { connect, disconnect, accounts } = useBlockchainNetwork();

    const handleConnectWallet = async () => {
        accounts.length ? disconnect() : connect();
    };

    return (
        <Container>
            <ConnectWalletButton onClick={handleConnectWallet}>
                {!accounts.length ? 'connect wallet' : `disconnect: ${accounts[0]}`}
            </ConnectWalletButton>
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
`;
const ConnectWalletButton = styled.button``;

export default Header;
