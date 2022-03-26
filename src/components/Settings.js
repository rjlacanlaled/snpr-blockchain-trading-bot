import styled from 'styled-components';

const Settings = ({ onConfirm }) => {
    return (
        <Container>
            <Label htmlFor='gasFee'>Gas fee</Label>
            <Input id='gasFee' placeholder='Gas fee (GWEI)' defaultValue={5} />
            <Label htmlFor='maxSlippage'>Max slippage</Label>
            <Input placeholder='Max Slippage' defaultValue={0.5} />

            <Button onClick={() => onConfirm(true)}>Save</Button>
            <Button onClick={() => onConfirm(false)}>Cancel</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;


    background-color: black;
    color: white;

    padding: 20px;
`;
const Input = styled.input``;
const Label = styled.label``;
const Button = styled.button``;

export default Settings;
