import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchain';
import usePersist from './hooks/usePersist';
import useTokenDetails from './hooks/useTokenDetails';
import useUniswap from './hooks/useUniswap';
import Settings from './Settings';
import { Modal } from './styles/Modal.styled';
import SwapSlippage from './SwapSlippage';
import TokenBalance from './TokenBalance';
import TokenInput from './TokenInput';
import TradeDetails from './TradeDetails';
import { FiSettings } from 'react-icons/fi';
import { MdSwapHoriz } from 'react-icons/md';
import useFloat from './hooks/useFloat';
import useTradingBot from './hooks/useTradingBot';

const TradeForm = ({ onSettingsClick, onSettingsUpdate }) => {
    const { network, connected, getFormattedTokenBalance, getTokenDecimal } = useBlockchainNetwork();
    const {
        swapExactTokensForTokens,
        swapExactTokensForTokensSupportingFeeOnTransferTokens,
        getDefaultFromToken,
        getDefaultToToken,
        updateRouter,
    } = useUniswap();

    const [fromToken, setFromToken] = usePersist(JSON.parse(localStorage.getItem('defaultBuyToken')));
    const [toToken, setToToken] = usePersist(JSON.parse(localStorage.getItem('defaultToToken')));
    const [slippage, setSlippage] = usePersist('tradeSlippage', '0.5');

    const [search, setSearch] = useState('');
    const [toAmount, setToAmount] = useState(0.0);
    const [fromAmount, setFromAmount] = useState(0.0);

    const handleSearchChange = e => {};
    const handleSubmit = e => {
        e.preventDefault();
    };
    const handleSwitch = () => {};
    const handleSettings = () => {};

    return (
        <Container>
            <FormHeader>
                <TradeButtons>
                    <StyledFiSettings onClick={handleSettings} />
                </TradeButtons>
                <Title>Trade</Title>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
                <SearchInput
                    onPaste={handleSearchChange}
                    onChange={handleSearchChange}
                    value={search}
                    placeholder='Enter token address'
                />
                <SwapSlippage slippage={slippage} onInputChange={setSlippage} />

                <TokenBalance token={fromToken} />
                <TokenInput onInputChange={setFromAmount} value={fromAmount} />
                <SwitchContainer>
                    <StyledMdSwapHoriz onClick={handleSwitch} />
                </SwitchContainer>
                <TokenBalance token={toToken} />
                <TokenInput onInputChange={setToAmount} value={toAmount} />
                <Label htmlFor='previousTokenAddress'>Previous Token Address</Label>
                <SwapButton>Swap</SwapButton>
                <TradeDetails fromToken={fromToken} fromAmount={fromAmount} toToken={toToken} />
            </Form>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid lightgray;
`;

const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 5px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid lightgray;
    padding: 10px;
    gap: 5px;
`;

const TradeButtons = styled.div`
    display: flex;
    gap: 5px;
`;

const Input = styled.input``;
const Label = styled.label``;

const SwapButton = styled.button`
    padding: 5px 10px 5px 10px;
    width: 100%;

    border-radius: 5px;
    border: 1px solid lightgray;
    font-size: 0.8rem;
    font-weight: 600;

    background-color: ${({ connected }) => (connected ? '#4BDBE6' : '#ECEAF4')};

    &:hover {
        background-color: ${({ connected }) => (connected ? 'hsl(184, 100%, 60%)' : 'gray')};
    }

    cursor: pointer;
`;

const SearchInput = styled.input`
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid lightgray;
`;
const Title = styled.p`
    font-size: 1.2rem;
    font-weight: 900;
`;

const StyledMdSwapHoriz = styled(MdSwapHoriz)`
    cursor: pointer;
`;

const SwitchContainer = styled.div`
    display: ${({ isDisabled }) => (isDisabled ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    background-color: hsl(184, 75%, 60%);
    cursor: pointer;

    &:hover {
        background-color: hsl(184, 100%, 60%);
    }
`;

const StyledFiSettings = styled(FiSettings)`
    color: hsl(184, 75%, 60%);
    cursor: pointer;

    font-size: 1.2rem;

    &:hover {
        opacity: 0.5;
    }
`;

export default TradeForm;
