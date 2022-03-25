import styled from 'styled-components';

const SwapSlippage = () => {
    return (
        <Container>
            <Slippage></Slippage>
            <AutoSlippage>Auto Slippage</AutoSlippage>
        </Container>
    );
};

const Container = styled.div``;
const Slippage = styled.input``;
const AutoSlippage = styled.button``;

export default SwapSlippage;
