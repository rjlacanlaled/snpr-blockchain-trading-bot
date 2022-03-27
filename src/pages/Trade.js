import styled from 'styled-components';
import TradeForm from '../components/TradeForm';

const Trade = () => {
    return (
        <Container>
            <TradeForm />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20vh;
`;

export default Trade;
