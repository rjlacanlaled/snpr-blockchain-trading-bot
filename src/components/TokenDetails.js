import styled from 'styled-components';

const TokenDetails = ({ isSend, onChooseToken, defaultToken }) => {
    return (
        <Container>
            <BasicDetails>
                <LogoContainer>
                    <TokenLogo src='/' />
                    <TokenName>Token Name</TokenName>
                </LogoContainer>

                <TokenSymbol>CRO</TokenSymbol>
            </BasicDetails>
            <TradeAmount>
                <TradeSide isSend={isSend}>{isSend ? 'You Send' : 'You Get'}</TradeSide>
                <Amount placeholder='0.0'></Amount>
            </TradeAmount>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);

    padding: 20px;
    min-width: 300px;
    min-height: 250px;

    background-color: hsl(216, 41%, 5%, 0.7);
`;
const BasicDetails = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;

    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
`;
const TokenLogo = styled.img``;
const TokenName = styled.p`
    color: gray;
`;
const LogoContainer = styled.div`
    display: flex;
    gap: 5px;
`;
const TokenSymbol = styled.button`
    padding-top: 5px;
    padding-bottom: 5px;
    border-style: none;
    
    background-color: transparent;
    color: hsl(0, 0%, 100%);
    text-align: left;
    font-size: 1.3rem;
    font-weight: 200;
`;
const TradeSide = styled.p``;
const TradeAmount = styled.div``;
const Amount = styled.input``;

export default TokenDetails;
