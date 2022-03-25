import { useState } from 'react';
import styled from 'styled-components';
import SwapSlippage from './SwapSlippage';
import TokenBalance from './TokenBalance';
import TokenInput from './TokenInput';
import TradeDetails from './TradeDetails';

const TradeForm = () => {
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');

    return (
        <Container>
            <Form>
                <SwapSlippage />
                <TokenBalance />
                <TokenInput />
                <TokenBalance />
                <TokenInput />
                <SwapButton>Swap</SwapButton>
                <TradeDetails from={fromToken} to={toToken} />
            </Form>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
`;
const Form = styled.form`
    border: 1px solid black;
    
    padding: 10px;
`;
const SwapButton = styled.button``;

export default TradeForm;
