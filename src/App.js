import styled from 'styled-components';
import BlockchainNetworkProvider from './components/contexts/BlockchainNetworkContext';
import Trade from './pages/Trade';

export default function App() {
    return (
        <BlockchainNetworkProvider>
            <Container>
                <Trade />
            </Container>
        </BlockchainNetworkProvider>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;
