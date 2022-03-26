import styled from 'styled-components';
import BlockchainNetworkProvider from './components/contexts/BlockchainNetworkContext';
import TradeForm from './components/TradeForm';

export default function App() {
    return (
        <BlockchainNetworkProvider>
            <Container>
                <TradeForm />
            </Container>
        </BlockchainNetworkProvider>
    );
}

const Container = styled.div``;
