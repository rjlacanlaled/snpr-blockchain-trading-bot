import styled from 'styled-components';

const TradeDetails = ({ fromSymbol, toSymbol, price }) => {

    return (
        <Container visible={fromSymbol && toSymbol && price}>
            <MinimumReceived></MinimumReceived>
            <Price>
                1{toSymbol}/{parseFloat(price).toFixed(6)}USD
            </Price>
        </Container>
    );
};

const Container = styled.div`
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;
const MinimumReceived = styled.p``;
const Price = styled.p``;

export default TradeDetails;
