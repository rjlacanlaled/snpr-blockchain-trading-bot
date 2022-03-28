import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlockchainNetwork from './hooks/useBlockchainNetwork';
import usePersist from './hooks/usePersist';
import useUniswap from './hooks/useUniswap';

const Settings = ({ onConfirm }) => {
    const { getTokenSymbol } = useBlockchainNetwork();
    const { getDefaultFromToken, getDefaultToToken } = useUniswap();
    const [gasFee, setGasFee] = usePersist('gasFee', 0.5);
    const [gasLimit, setGasLimit] = usePersist('gasLimit', 800000);
    const [maxSlippage, setMaxSlippage] = usePersist('maxSlippage', 40);
    const [buyToken, setBuyToken] = usePersist('defaultBuyToken', getDefaultFromToken());
    const [sellToken, setSellToken] = usePersist('defaultSellToken', getDefaultToToken());
    const [buySymbol, setBuySymbol] = useState('');
    const [sellSymbol, setSellSymbol] = useState('');

    useEffect(async () => {
        setBuySymbol(await getTokenSymbol(buyToken));
        setSellSymbol(await getTokenSymbol(sellToken));
    }, []);

    useEffect(async () => {
        setBuySymbol(await getTokenSymbol(buyToken));
    }, [buyToken]);

    useEffect(async () => {
        setSellSymbol(await getTokenSymbol(sellToken));
    }, [sellToken]);

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
    gap: 8px;

    background-color: #eceff4;
    color: white;
    min-width: 400px;

    border-radius: 20px;
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
