import styled from 'styled-components';
import BlockchainNetworkProvider from './components/contexts/BlockchainNetworkContext';
import UniswapContextProvider from './components/contexts/UniswapContext';
import Header from './components/Header';
import Global from './components/styles/Global';
import Trade from './pages/Trade';

export default function App() {
    return (
        <BlockchainNetworkProvider>
            <UniswapContextProvider>
                <Global />
                <Header />
                <Container>
                    <Trade />
                </Container>
            </UniswapContextProvider>
        </BlockchainNetworkProvider>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #EBF5FF;
`;
