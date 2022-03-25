import styled from 'styled-components';

const TokenInput = () => {
    return (
        <Container>
            <Amount />
            <MaxButton></MaxButton>
        </Container>
    );
};

const Container = styled.div``;
const Amount = styled.input``;
const MaxButton = styled.button``;

export default TokenInput;
