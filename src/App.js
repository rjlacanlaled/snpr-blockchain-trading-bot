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
                            <Route path="/order" element={<Trade />}/>
                        </Routes>
                    </Container>
                </UniswapContextProvider>
            </BlockchainNetworkProvider>
        </BrowserRouter>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #ebf5ff;
`;
