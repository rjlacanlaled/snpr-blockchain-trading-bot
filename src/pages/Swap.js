import styled from 'styled-components';

const Swap = () => {
    return (
        <Container>
            <TitleContainer>
                <MainTitle>Exchange Tokens Instantly</MainTitle>
                <SubTitle>Select tokens to swap</SubTitle>
            </TitleContainer>
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
    font-size: 3.5rem;
    font-weight: 400;
`;

const SubTitle = styled.h2`
    color: hsl(0, 0%, 80%);
    font-size: 1rem;
    font-weight: 300;
`;

export default Swap;
