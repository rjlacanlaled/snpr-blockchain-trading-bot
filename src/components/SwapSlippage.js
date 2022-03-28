import styled from 'styled-components';

const SwapSlippage = ({ onInputChange, slippage }) => {
    return (
        <Container>
            <Slippage
                value={slippage}
                placeholder={0.5}
                onChange={e => onInputChange(e.target.value)}
            />
            <AutoSlippage>Auto</AutoSlippage>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
    min-height: 50px;
`;
const Slippage = styled.input`
    padding: 5px;
    border-radius: 10px;
    border: 1px solid lightgray;
    flex: 1 75%;
`;
const AutoSlippage = styled.button`
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    font-size: 0.7rem;
    border: 1px solid lightgray;
    width: 100%;
    flex: 1 25%;
    cursor: pointer;
`;

export default SwapSlippage;
