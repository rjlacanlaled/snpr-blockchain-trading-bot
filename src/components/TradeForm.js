import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';
import usePersist from './hooks/usePersist';
import useTokenDetails from './hooks/useTokenDetails';
import SwapSlippage from './SwapSlippage';
import TokenBalance from './TokenBalance';
import TokenInput from './TokenInput';
import TradeDetails from './TradeDetails';

const TradeForm = () => {
    const network = useBlockchainNetwork();
    const [fromToken, setFromToken] = usePersist('fromTokenAdrress', '');
    const [toToken, setToToken] = usePersist('toTokenAdrress', '');
    const [fromDetails, setFromDetails] = useTokenDetails(network, fromToken);
    const [toDetails, setToDetails] = useTokenDetails(network, toToken);

    useEffect(() => {
        setFromDetails(network, fromToken);
        setToDetails(network, toToken);
    }, [fromToken, toToken]);

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
