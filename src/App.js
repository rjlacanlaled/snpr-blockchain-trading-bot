import styled from 'styled-components';
import BlockchainNetworkProvider from './components/contexts/BlockchainNetworkContext';
import UniswapContextProvider from './components/contexts/UniswapContext';
import Header from './components/Header';
import Global from './components/styles/Global';
import Trade from './pages/Trade';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <BlockchainNetworkProvider>
                <UniswapContextProvider>
                    <Global />
                    <Header />
                    <Container>
                        <Routes>
                            <Route path='/' element={<Trade />} />
                            <Route path='/order' element={<Trade />} />
                            <Route path='auto' element={<Trade auto={true} />} />
                        </Routes>
                    </Container>
                </UniswapContextProvider>
            </BlockchainNetworkProvider>
        </BrowserRouter>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;

    overflow: auto;

    background-color: #ebf5ff;
`;
