import { useState } from 'react';
import styled from 'styled-components';
import Settings from '../components/Settings';
import { Modal } from '../components/styles/Modal.styled';
import TradeForm from '../components/TradeForm';

const Trade = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [settingsUpdate, setSettingsUpdate] = useState(0);

    const handleSettingsConfirm = confirm => {
        setShowSettings(false);
        setSettingsUpdate(settingsUpdate + 1);
    };

    return (
        <Container>
            <TradeForm onSettingsClick={setShowSettings} onSettingsUpdate={settingsUpdate}/>
            <Modal show={showSettings}>
                <Settings onConfirm={handleSettingsConfirm} />
            </Modal>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20vh;
`;

export default Trade;
