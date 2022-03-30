import styled from 'styled-components';
import BlockchainProvider from './components/contexts/BlockchainContext';
import UniswapContextProvider from './components/contexts/UniswapContext';
import Global from './components/styles/Global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Erc20ContextProvider from './components/contexts/Erc20Context';
import Sidebar from './components/Sidebar';
import Swap from './pages/Swap';
import Header from './components/Header';

export default function App() {
    return (
        <Container>
            <BrowserRouter>
                <BlockchainProvider>
                    <Erc20ContextProvider>
                        <UniswapContextProvider>
                            <Global />
                            <Header />
                            <Sidebar />
                            <Routes>
                                <Route path='/' element={<Swap />} />
                            </Routes>
                        </UniswapContextProvider>
                    </Erc20ContextProvider>
                </BlockchainProvider>
            </BrowserRouter>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
`;
