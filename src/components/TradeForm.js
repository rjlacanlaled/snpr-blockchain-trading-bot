import styled from 'styled-components';
import SwapSlippage from './SwapSlippage';
import TokenBalance from './TokenBalance';
import TokenInput from './TokenInput';

const TradeForm = () => {
    return (
        <Form>
            <SwapSlippage />
            <TokenBalance />
            <TokenInput />
            <TokenBalance />
            <TokenInput />
            <SwapButton>Swap</SwapButton>
        </Form>
    );
};

const Form = styled.form``;
const SwapButton = styled.button``;

export default TradeForm;
