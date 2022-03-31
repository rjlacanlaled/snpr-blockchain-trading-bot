import styled from 'styled-components';
import Global from './components/styles/Global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Swap from './pages/Swap';
import Header from './components/Header';
import { useState } from 'react';
import GraphQLTest from './pages/GraphQLTest';
import CharacterSummary from './pages/CharacterSummary';
import Sample from './components/hooks/Sample';

export default function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Container>
            <BrowserRouter>
                <Global />
                <Header toggle={setShowSidebar} sidebarVisible={showSidebar} />
                <Sidebar show={showSidebar} toggle={setShowSidebar} />
                <Routes>
                    <Route path='/' element={<Swap />} />
                    <Route path="/limit" element={<Sample />} />
                    <Route path='/graphql' element={<GraphQLTest />}>
                        <Route path=':id' element={<CharacterSummary />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;

    overflow: auto;
`;
