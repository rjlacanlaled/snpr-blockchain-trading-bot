import styled from 'styled-components';
import TokenBalance from './TokenBalance';

const TradeForm = () => {
    return (
        <Form>
            <TokenBalance />
            <TokenInput />
        </Form>
    );
};

const Form = styled.form``;

export default TradeForm;
