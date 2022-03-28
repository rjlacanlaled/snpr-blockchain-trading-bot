import { useState } from 'react';
import styled from 'styled-components';
import useTradingBot from '../components/hooks/useTradingBot';
import Settings from '../components/Settings';
import StatusBox from '../components/StatusBox';
import { Modal } from '../components/styles/Modal.styled';
import TradeForm from '../components/TradeForm';
import TransactionHistory from '../components/TransactionHistory';

const Trade = ({ auto }) => {
    const { tradeHistory, status } = useTradingBot();
    const [showSettings, setShowSettings] = useState(false);
    const [settingsUpdate, setSettingsUpdate] = useState(0);


    const handleSettingsConfirm = confirm => {
        setShowSettings(false);
        setSettingsUpdate(settingsUpdate + 1);
    };

    return (
        <Container>
            <TradeForm auto={auto} onSettingsClick={setShowSettings} onSettingsUpdate={settingsUpdate} />
            <Modal show={showSettings}>
                <Settings onConfirm={handleSettingsConfirm} />
            </Modal>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-evenly;

    padding-top: 20vh;
    gap: 20px;
`;

const StatusContainer = styled.div``;

export default Trade;
