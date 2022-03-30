import styled from 'styled-components';
import TokenDetails from '../components/TokenDetails';
import { AiOutlineSwap } from 'react-icons/ai';
import { useEffect } from 'react';

const Swap = () => {
    return (
        <Container>
            <TitleContainer>
                <MainTitle>Exchange Tokens Instantly</MainTitle>
                <SubTitle>Select tokens to swap</SubTitle>
            </TitleContainer>
            <TradeForm>
                <TokenInputContainer>
                    <TokenDetails isSend={true} />
                    <TokenDetails isSend={false} />
                    <StyledAiOutlineSwap />
                </TokenInputContainer>
                <SwapDetailsContainer>
                    <Details></Details>
                    <SwapButton>Swap</SwapButton>
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
    padding-top: 140px;
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
`;

export default Swap;
