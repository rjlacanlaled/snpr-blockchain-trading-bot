import styled from 'styled-components';

const TradeDetails = ({ from, to }) => {
    return (
        <Container visible={from && to}>
            <MinimumReceived>1000</MinimumReceived>
            <Price>100 MTK / 1 BUSD</Price>
        </Container>
    );
};

const Container = styled.div`
    display: ${({visible}) => (visible ? 'flex' : 'none')};
`;
const MinimumReceived = styled.p``;
const Price = styled.p``;

export default TradeDetails;
