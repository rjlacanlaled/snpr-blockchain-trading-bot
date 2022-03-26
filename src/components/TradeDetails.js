import styled from 'styled-components';

const TradeDetails = ({ fromSymbol, toSymbol, price }) => {
    return (
        <Container visible={fromSymbol && toSymbol && price}>
            <Title>Trade Details</Title>
            <MinimumReceived></MinimumReceived>
            <Price>
                Price: 1 {toSymbol}/
                {parseInt(price) > 0 ? parseFloat(price).toFixed(2) : parseFloat(price).toFixed(6)} USD
            </Price>
        </Container>
    );
};

const Container = styled.div`
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    flex-direction: column;
    padding: 10px;
    gap: 3px;

    font-size: 0.7rem;
    border: 1px solid gray;
    border-radius: 10px;

    background-color: lightgray;
    color: gray;
`;
const MinimumReceived = styled.p``;
const Price = styled.p``;
const Title = styled.p`
    text-align: center;
    border-bottom: 1px solid gray;
`;

export default TradeDetails;
