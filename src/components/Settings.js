import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';
import usePersist from './hooks/usePersist';
import useUniswap from './hooks/useUniswap';

/*
    { transaction hash, amountIn, amountInSymbol, amountOut, amountOutsymbol, profit }
*/

const Settings = ({ onConfirm }) => {
    const { getTokenSymbol } = useBlockchainNetwork();
    const { getDefaultFromToken, getDefaultToToken } = useUniswap();
    const [gasFee, setGasFee] = usePersist('gasFee', '5');
    const [gasLimit, setGasLimit] = usePersist('gasLimit', '800000');
    const [maxSlippage, setMaxSlippage] = usePersist('maxSlippage', 40);
    const [buyToken, setBuyToken] = usePersist('defaultBuyToken', getDefaultFromToken());
    const [sellToken, setSellToken] = usePersist('defaultSellToken', getDefaultToToken());
    const [profitPercentage, setProfitPercentage] = usePersist('profitPercentage', 10);
    const [buySymbol, setBuySymbol] = useState('');
    const [sellSymbol, setSellSymbol] = useState('');
    const [token1Address, setToken1Address] = usePersist('token1address', '');
    const [token2Address, setToken2Address] = usePersist('token2address', '');
    const [token1Symbol, setToken1Symbol] = useState('');
    const [token2Symbol, setToken2Symbol] = useState('');

    useEffect(async () => {
        setBuySymbol(await getTokenSymbol(buyToken));
        setSellSymbol(await getTokenSymbol(sellToken));
        setToken1Symbol(await getTokenSymbol(token1Address));
        setToken2Symbol(await getTokenSymbol(token2Address));
    }, []);

    useEffect(async () => {
        setBuySymbol(await getTokenSymbol(buyToken));
    }, [buyToken]);

    useEffect(async () => {
        setSellSymbol(await getTokenSymbol(sellToken));
    }, [sellToken]);

    useEffect(async () => {
        setToken1Symbol(await getTokenSymbol(token1Address));
    }, [token1Address]);

    useEffect(async () => {
        setToken2Symbol(await getTokenSymbol(token2Address));
    }, [token2Address]);

    return (
        <Container>
            <TitleContainer>
                <Title>Settings</Title>
            </TitleContainer>

            <Label htmlFor='buyToken'>Default Buy : {buySymbol}</Label>
            <Input id='buyToken' value={buyToken} onChange={e => setBuyToken(e.target.value)} />
            <Label htmlFor='sellToken'>Default Sell : {sellSymbol} </Label>
            <Input id='sellToken' value={sellToken} onChange={e => setSellToken(e.target.value)} />
            <Label htmlFor='gasFee'>Gas fee</Label>
            <Input id='gasFee' placeholder='Gas fee (GWEI)' value={gasFee} onChange={e => setGasFee(e.target.value)} />
            <Label htmlFor='gasLimit'>Gas Limit</Label>
            <Input
                id='gasLimit'
                placeHolder='Gas limit (WEI)'
                value={gasLimit}
                onChange={e => setGasLimit(e.target.value)}
            />
            <Label htmlFor='maxSlippage'>Max slippage</Label>
            <Input
                id='maxSlippage'
                placeholder='Max Slippage'
                value={maxSlippage}
                onChange={e => setMaxSlippage(e.target.value)}
            />

            <Label htmlFor='autoTrade'> Auto Trade Settings</Label>
            <Label htmlFor='profitPercentage'>Profit Percentage</Label>
            <Input
                id='profitPercentage'
                placeholder='Profit percentage'
                value={profitPercentage}
                onChange={e => setProfitPercentage(e.target.value)}
            />
            <Label htmlFor='token1address'>Token 1 Address : {token1Symbol} </Label>
            <Input id='token1address' value={token1Address} onChange={e => setToken1Address(e.target.value)} />
            <Label htmlFor='token2address'>Token 2 Address: {token2Symbol} </Label>
            <Input id='token2address' value={token2Address} onChange={e => setToken2Address(e.target.value)} />

            <ButtonContainer>
                <PrimaryButton onClick={() => onConfirm(true)}>Save</PrimaryButton>
                <NegativeButton onClick={() => onConfirm(false)}>Cancel</NegativeButton>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    top: 0;
    gap: 8px;
    

    background-color: #eceff4;
    color: white;
    min-width: 400px;

    border-radius: 20px;

    max-height: 600px;
    z-index: 100;
    overflow: scroll;
`;
const Input = styled.input`
    padding: 10px;
    margin: 0px 10px 0px 10px;
    font-weight: 600;
    border-radius: 10px;
    border: 1px solid lightgray;
`;
const Label = styled.label`
    padding: 5px 10px 5px 10px;
    font-weight: 600;
`;
const Button = styled.button`
    padding: 10px 20px 10px 20px;
    width: 100%;

    border: 1px solid lightgray;
    border-radius: 10px;

    font-weight: 900;

    background-color: hsl(184, 75%, 60%);
    cursor: pointer;

    &:hover {
        background-color: hsl(184, 100%, 60%);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    justify-content: center;
    align-items: center;

    padding: 10px;
`;

const PrimaryButton = styled(Button)``;
const NegativeButton = styled(Button)`
    background-color: hsl(0, 50%, 50%);
    cursor: pointer;

    &:hover {
        background-color: hsl(0, 100%, 50%);
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid lightgray;
`;
const Title = styled.p`
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 900;

    cursor: pointer;
`;

export default Settings;
