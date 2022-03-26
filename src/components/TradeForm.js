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

const TradeForm = ({
    defaultFromToken = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    defaultToToken = '0x129385c4acd0075e45a0c9a5177bdfec9678a138',
}) => {
    const { network, connected, getTokenBalance, getFormattedTokenBalance } = useBlockchainNetwork();
    const { router, swapExactTokensForTokens } = useUniswap();
    const [fromToken, setFromToken] = useState(defaultFromToken);
    const [toToken, setToToken] = useState(defaultToToken);
    const [fromDetails, setFromDetails] = useTokenDetails(network, fromToken);
    const [toDetails, setToDetails] = useTokenDetails(network, toToken);
    const [fromBalance, setFromBalance] = useState(0);
    const [toBalance, setToBalance] = useState(0);
    const [search, setSearch] = useState('');
    const [isBuying, setIsBuying] = useState(true);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);

    const [showSettings, setShowSettings] = useState(false);

    useEffect(async () => {
        setFromDetails(network, fromToken);
        setFromBalance(await getFormattedTokenBalance(fromToken));
    }, [fromToken]);

    useEffect(async () => {
        setToDetails(network, toToken);
        setToBalance(await getFormattedTokenBalance(toToken));
    }, [toToken]);

    useEffect(async () => {
        setFromBalance(await getFormattedTokenBalance(fromToken));
        setToBalance(await getFormattedTokenBalance(toToken));
    }, [connected]);

    useEffect(() => {
        if (isBuying) {
            setFromToken(defaultFromToken);
            setToToken(search);
        } else {
            setToToken(defaultFromToken);
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
        console.log(fromAmount);
        console.log(fromDetails);
        console.log(toAmount);
        console.log(toDetails);
    };

    const handleSwitch = () => {
        setIsBuying(!isBuying);
    };

    const handleSettings = () => {
        setShowSettings(true);
    };

    const handleSettingsConfirm = confirm => {
        setShowSettings(false);
    };

    const handleFromAmountChange = e => {
        setFromAmount(e.target.value);
    };

    const handleToAmountChange = e => {
        setToAmount(e.target.value);
    };

    return (
        <Container>
            <FormHeader>
                <TradeButtons>
                    <FiSettings onClick={handleSettings} />
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
                <SwapSlippage defaultValue={0.5} />
                <TokenBalance
                    token={fromDetails && fromDetails[0] && fromDetails[1].name}
                    balance={fromBalance}
                    tokenSymbol={fromDetails && fromDetails[0] && fromDetails[1].symbol}
                />
                <TokenInput onInputChange={setFromAmount} value={fromAmount} />
                <MdSwapHoriz onClick={handleSwitch} />
                <TokenBalance
                    token={toDetails && toDetails[0] && toDetails[1].name}
                    balance={toBalance}
                    tokenSymbol={toDetails && toDetails[0] && toDetails[1].symbol}
                />
                <TokenInput onInputChange={setToAmount} value={toAmount} />
                <SwapButton connected={connected} disabled={!connected}>{connected ? 'Swap' : 'Not Connected'}</SwapButton>
                <TradeDetails
                    fromSymbol={fromDetails && fromDetails[0] && fromDetails[1].symbol}
                    toSymbol={toDetails && toDetails[0] && toDetails[1].symbol}
                    price={toDetails && toDetails[0] && toDetails[1].price}
                />
            </Form>

            <Modal show={showSettings}>
                <Settings onConfirm={handleSettingsConfirm} />
            </Modal>
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
const SwapButton = styled.button`
    padding: 5px 10px 5px 10px;
    width: 100%;

    border-radius: 5px;
    border: 1px solid lightgray;
    font-size: 0.8rem;
    font-weight: 600;

    background-color: ${({connected}) => connected ? '#4BDBE6' : '#ECEAF4'};

    &:hover {
        background-color: ${({connected}) => connected ? 'hsl(184, 100%, 60%)' : 'gray'};
    }

    cursor: pointer;
`;
const SwitchButton = styled.button`
    width: 100%;
    cursor: pointer;
`;
const SearchInput = styled.input`
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid lightgray;
`;
const Title = styled.p``;

export default TradeForm;
