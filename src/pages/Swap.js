import styled from 'styled-components';
import TokenDetails from '../components/TokenDetails';
import { AiOutlineSwap } from 'react-icons/ai';
import useUniswap from '../components/hooks/useUniswap';
import { useEffect, useState } from 'react';
import useToken, { TOKEN_ACTIONS } from '../components/hooks/useToken';
import { Modal } from 'react-bootstrap';
import Setting from '../components/Setting';
import useBlockchain from '../components/hooks/useBlockchain';
import { ethers } from 'ethers';


const Swap = () => {
    const { hasAllowance, approveToSpend, getAmountOutMinUnformattedInput, getUniswapContractWithSigner, swap } =
        useUniswap();
    const { provider, getWeb3Provider } = useBlockchain();
    const [sendToken, sendTokenDispatcher] = useToken();
    const [getToken, getTokenDispatcher] = useToken();
    const [prioritizeGetAmount, setPrioritizeGetAmount] = useState(true);
    const [canSpend, setCanSpend] = useState(false);
    const [approving, setApproving] = useState(false);

    const handleSwitch = () => {
        const temp = sendToken;
        sendTokenDispatcher({ type: TOKEN_ACTIONS.UPDATE_TOKEN, payload: { data: getToken } });
        getTokenDispatcher({ type: TOKEN_ACTIONS.UPDATE_TOKEN, payload: { data: temp } });
    };

    const handleSwap = async e => {
        e.preventDefault();
        if (canSpend) {
            // swap tokens
            console.log({
                send: sendToken.contract,
                get: getToken.contract,
                amount: sendToken.amount,
                slippage: JSON.parse(localStorage.getItem('slippageTolerance')),
                gasFee: JSON.parse(localStorage.getItem('gasFee')),
            });

            const wallet = ethers.Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC).connect(getWeb3Provider());
            const slippage = JSON.parse(localStorage.getItem('slippageTolerance'));
            const tradeData = await getAmountOutMinUnformattedInput(
                wallet,
                sendToken.amount,
                sendToken.contract,
                getToken.contract,
                slippage
            );

            // amountIn, amountOutMin, tokenIn, tokenOut

            const tx = await swap(
                tradeData.data.amountIn,
                tradeData.data.amountOutMin,
                sendToken.contract,
                getToken.contract
            );

            console.log({ tx });
        } else {
            setApproving(true);
        }
    };

    useEffect(() => {
        if (!approving) return;
        const approve = async () => {
            try {
                const tx = await approveToSpend(sendToken.contract);
                setCanSpend(await hasAllowance(sendToken.contract));
                setApproving(false);
            } catch (err) {
                setCanSpend(await hasAllowance(sendToken.contract));

                setApproving(false);
            }
        };

        approve();
    }, [approving]);

    useEffect(() => {
        const checkAllowance = async () => {
            setCanSpend(await hasAllowance(sendToken.contract));
        };
        if (sendToken.contract !== '') {
            if (sendToken.contract === getToken.contract) {
                return getTokenDispatcher({ type: TOKEN_ACTIONS.RESET_TOKEN });
            }

            checkAllowance();
        }
    }, [sendToken]);

    useEffect(() => {
        if (getToken.contract !== '') {
            if (getToken.contract === sendToken.contract) {
                return sendTokenDispatcher({ type: TOKEN_ACTIONS.RESET_TOKEN });
            }
        }
    }, [getToken]);

    return (
        <Container>
            <TitleContainer>
                <MainTitle>Exchange Tokens Instantly</MainTitle>
                <SubTitle>Select tokens to swap</SubTitle>
            </TitleContainer>
            <TradeForm>
                <TokenInputContainer>
                    <TokenDetails
                        isSend={true}
                        token={sendToken}
                        onTokenChange={sendTokenDispatcher}
                        onAmountChange={setPrioritizeGetAmount}
                        ignore={getToken.contract}
                    />
                    <TokenDetails
                        isSend={false}
                        token={getToken}
                        onTokenChange={getTokenDispatcher}
                        onAmountChange={setPrioritizeGetAmount}
                        ignore={sendToken.contract}
                    />
                    <StyledAiOutlineSwap onClick={handleSwitch} />
                </TokenInputContainer>
                <SwapDetailsContainer>
                    <Details></Details>
                    <SwapButton
                        disabled={
                            !(sendToken.contract && getToken.contract) ||
                            ((parseFloat(sendToken.amount) <= 0 || sendToken.amount === '') && canSpend) ||
                            approving
                        }
                        onClick={handleSwap}>
                        {approving
                            ? 'Approving'
                            : sendToken.contract && getToken.contract
                            ? canSpend
                                ? parseFloat(sendToken.amount) <= 0 || !sendToken.amount
                                    ? 'Enter amount'
                                    : 'Swap'
                                : 'Approve'
                            : 'Choose tokens to swap'}
                    </SwapButton>
                </SwapDetailsContainer>
            </TradeForm>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-left: 250px;

    gap: 80px;

    min-height: 100vh;
    min-width: 100vw;

    overflow: auto;

    @media (max-width: 1020px) {
        justify-content: flex-start;
        padding-left: 0px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;
const MainTitle = styled.h1`
    color: hsl(0, 0%, 90%);
    font-size: 4rem;
    font-weight: 400;
    text-align: center;

    @media (max-width: 760px) {
        font-size: 2rem;
    }
`;

const SubTitle = styled.h2`
    color: hsl(0, 0%, 80%);
    font-size: 1rem;
    font-weight: 300;
    text-align: center;
`;

const TokenInputContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 760px) {
        flex-direction: column;
        width: 100%;
    }
`;

const StyledAiOutlineSwap = styled(AiOutlineSwap)`
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;

    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: 50px;

    color: white;
    background-color: hsl(194, 81%, 30%);

    &:hover {
        background-color: hsl(194, 81%, 60%);
    }
`;

const TradeForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 760px) {
        flex-direction: column;
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
    }
`;

const SwapDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;

    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);

    background-color: hsl(216, 41%, 5%, 0.7);
    padding: 15px;
`;
const Details = styled.div``;
const SwapButton = styled.button`
    cursor: pointer;
    padding: 15px 30px 15px 30px;
    font-size: 1.1rem;

    border-radius: 10px;
    background-color: rgb(23, 169, 214, 0.2);
    color: hsl(194, 81%, 50%);
    border-style: none;

    &:hover {
        background-color: rgb(23, 169, 214, 0.5);
        color: hsl(194, 81%, 60%);
    }

    &:disabled {
        background-color: gb(180, 180, 180, 0.2);
        cursor: not-allowed;
    }
`;

export default Swap;
