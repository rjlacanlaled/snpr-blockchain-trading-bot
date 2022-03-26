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

const TradeForm = ({
    defaultFromToken = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    defaultToToken = '0x129385c4acd0075e45a0c9a5177bdfec9678a138',
}) => {
    const network = useBlockchainNetwork();
    const [fromToken, setFromToken] = useState(defaultFromToken);
    const [toToken, setToToken] = useState(defaultToToken);
    const [fromDetails, setFromDetails] = useTokenDetails(network, fromToken);
    const [toDetails, setToDetails] = useTokenDetails(network, toToken);
    const [fromBalance, setFromBalance] = useState(0);
    const [toBalance, setToBalance] = useState(0);
    const [search, setSearch] = useState('');
    const [isBuying, setIsBuying] = useState(true);

    useEffect(() => {
        setFromDetails(network, fromToken);
    }, [fromToken]);

    useEffect(() => {
        setToDetails(network, toToken);
    }, [toToken]);

    useEffect(() => {
        if (isBuying) {
            setFromToken(defaultFromToken);
            setToToken(search);
        } else {
            setToToken(defaultFromToken);
            setFromToken(search);
        }
    }, [search]);

    useEffect(() => {}, [fromDetails, toDetails]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleSwitch = () => {
        setIsBuying(!isBuying);
        setFromDetails(toDetails);
        setToDetails(fromDetails);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <SearchInput
                    onPaste={handleSearchChange}
                    onChange={handleSearchChange}
                    value={search}
                    placeholder='Enter token address'
                />
                <SwapSlippage />
                <TokenBalance
                    token={fromDetails && fromDetails[0] && fromDetails[1].name}
                    balance={fromBalance}
                    tokenSymbol={fromDetails && fromDetails[0] && fromDetails[1].symbol}
                />
                <TokenInput />
                <SwitchButton onClick={handleSwitch}>Switch</SwitchButton>
                <TokenBalance
                    token={toDetails && toDetails[0] && toDetails[1].name }
                    balance={toBalance}
                    tokenSymbol={toDetails && toDetails[0] && toDetails[1].symbol}
                />
                <TokenInput />
                <SwapButton>Swap</SwapButton>
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
`;
const Form = styled.form`
    border: 1px solid black;

    padding: 10px;
`;
const SwapButton = styled.button``;
const SwitchButton = styled.button``;
const SearchInput = styled.input``;

export default TradeForm;
