import styled from 'styled-components';
import TokenDetails from '../components/TokenDetails';
import { AiOutlineSwap } from 'react-icons/ai';

const Swap = () => {
    return (
        <Container>
            <TitleContainer>
                <MainTitle>Exchange Tokens Instantly</MainTitle>
                <SubTitle>Select tokens to swap</SubTitle>
            </TitleContainer>
            <TokenInputContainer>
                <TokenDetails />
                <TokenDetails />
                <StyledAiOutlineSwap />
            </TokenInputContainer>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    padding-left: 250px;

    gap: 80px;

    height: 100vh;
    width: 100vw;
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
        background-color: hsl(194, 81%, 60%)
    }
`;

export default Swap;
