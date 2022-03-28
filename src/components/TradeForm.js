import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';
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

const TradeForm = ({ onSettingsClick, onSettingsUpdate, auto = false }) => {
    const { network, connected, getFormattedTokenBalance } = useBlockchainNetwork();
    const {
        swapExactTokensForTokens,
        swapExactTokensForTokensSupportingFeeOnTransferTokens,
        getDefaultFromToken,
        getDefaultToToken,
        updateRouter,
    } = useUniswap();

    const { initAutoTrade, isRunning } = useTradingBot();
    const [fromToken, setFromToken] = useState(getDefaultFromToken());
    const [toToken, setToToken] = useState(getDefaultToToken());
    const [fromDetails, setFromDetails] = useTokenDetails(network, fromToken);
    const [toDetails, setToDetails] = useTokenDetails(network, toToken);
    const [fromBalance, setFromBalance] = useState(0);
    const [toBalance, setToBalance] = useState(0);
    const [search, setSearch] = useState('');
    const [isBuying, setIsBuying] = useState(true);
    const [fromAmount, setFromAmount] = useFloat(0, 30);
    const [toAmount, setToAmount] = useFloat(0, 30);
    const [slippage, setSlippage] = useFloat(0.5, 30);

    const [previousToken, setPreviousToken] = usePersist('previousTokenForAutoTrade');
    const [previousAmount, setPreviousAmount] = usePersist('previousAmountForBot');

    useEffect(() => {
        const updateData = async () => {
            setFromToken(getDefaultFromToken());
            setToToken(getDefaultToToken());
            updateRouter();
        };

        updateData();
    }, [onSettingsUpdate]);

    useEffect(() => {
        const updateFromDetails = async () => {
            setFromDetails(network, fromToken);
            setFromBalance(await getFormattedTokenBalance(fromToken));
        };

        updateFromDetails();
    }, [fromToken]);

    useEffect(() => {
        const updateToDetails = async () => {
            setToDetails(network, toToken);
            setToBalance(await getFormattedTokenBalance(toToken));
        };

        updateToDetails();
    }, [toToken]);

    useEffect(() => {
        const updateBalance = async () => {
            setFromBalance(await getFormattedTokenBalance(fromToken));
            setToBalance(await getFormattedTokenBalance(toToken));
        };

        updateBalance();
    }, [connected]);

    useEffect(() => {
        if (isBuying) {
            setFromToken(getDefaultFromToken());
            setToToken(search);
        } else {
            setToToken(getDefaultFromToken());
            setFromToken(search);
        }
    }, [search]);

    useEffect(() => {
        setFromToken(toToken);
        setToToken(fromToken);
    }, [isBuying]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        //token1, token2, slippage, previousToken, previousAmount, profitRate
        if (auto) {
            if (!slippage || !previousToken || !previousAmount) return;

            return initAutoTrade(
                JSON.parse(localStorage.getItem('token1address')),
                JSON.parse(localStorage.getItem('token2address')),
                slippage,
                previousToken,
                previousAmount,
                JSON.parse(localStorage.getItem('profitPercentage'))    
            );
        } else {
            swapExactTokensForTokensSupportingFeeOnTransferTokens(
                fromAmount,
                fromToken,
                toToken,
                slippage,
                JSON.parse(localStorage.getItem('gasFee')),
                JSON.parse(localStorage.getItem('gasLimit')),
                5
            );
        }
    };

    const handleSwitch = () => {
        setIsBuying(!isBuying);
    };

    const handleSettings = () => {
        onSettingsClick(true);
    };

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

                <TokenBalance
                    token={fromDetails && fromDetails[0] && fromDetails[1].name}
                    balance={fromBalance}
                    tokenSymbol={fromDetails && fromDetails[0] && fromDetails[1].symbol}
                />
                <TokenInput onInputChange={setFromAmount} value={fromAmount} auto={auto} />
                <SwitchContainer isDisabled={auto}>
                    <StyledMdSwapHoriz onClick={handleSwitch} />
                </SwitchContainer>

                <TokenBalance
                    token={toDetails && toDetails[0] && toDetails[1].name}
                    balance={toBalance}
                    tokenSymbol={toDetails && toDetails[0] && toDetails[1].symbol}
                />
                <TokenInput onInputChange={setToAmount} value={toAmount} auto={auto} />

                <Label htmlFor='previousTokenAddress'>Previous Token Address</Label>
                <Input
                    id='previousTokenAddress'
                    value={previousToken}
                    onChange={e => setPreviousToken(e.target.value)}
                />
                <Label htmlFor='previousTokenAmount'>Previous Token Amount</Label>
                <Input
                    id='previousTokenAmount'
                    value={previousAmount}
                    onChange={e => setPreviousAmount(e.target.value)}
                />

                <SwapButton
                    connected={connected}
                    disabled={
                        !connected ||
                        (fromAmount <= 0 && !auto) ||
                        fromToken == toToken ||
                        fromToken == 'Error' ||
                        toToken == 'Error'
                    }
                >
                    {connected
                        ? fromToken == toToken || fromToken == 'Error' || toToken == 'Error'
                            ? 'Something went wrong, refresh page...'
                            : auto
                            ? isRunning
                                ? 'Bot is running, click to stop'
                                : 'Start Bot'
                            : fromAmount <= 0
                            ? 'Amount is less than 0'
                            : 'Swap'
                        : 'Not Connected'}
                </SwapButton>
                <TradeDetails
                    fromSymbol={fromDetails && fromDetails[0] && fromDetails[1].symbol}
                    toSymbol={toDetails && toDetails[0] && toDetails[1].symbol}
                    price={toDetails && toDetails[0] && toDetails[1].price}
                />
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
