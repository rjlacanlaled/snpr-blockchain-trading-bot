import styled from 'styled-components';

const Settings = ({ onConfirm }) => {
    return (
        <Container>
            <TitleContainer>
                <Title>Settings</Title>
            </TitleContainer>

            <Label htmlFor='gasFee'>Gas fee</Label>
            <Input id='gasFee' placeholder='Gas fee (GWEI)' defaultValue={5} />
            <Label htmlFor='maxSlippage'>Max slippage</Label>
            <Input placeholder='Max Slippage' defaultValue={0.5} />

            <ButtonContainer>
                <PrimaryButton onClick={() => onConfirm(true)}>Save</PrimaryButton>
                <NegativeButton onClick={() => onConfirm(false)}>Cancel</NegativeButton>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    background-color: #eceff4;
    color: white;

    border-radius: 20px;
`;
const Input = styled.input`
    padding: 10px;
    margin: 0px 10px 0px 10px;
    font-weight: 600;
    border-radius: 10px;
    border: 1px solid lightgray;
`;
const Label = styled.label`
    padding: 5px 10px 5px 10px;
    font-weight: 600;
`;
const Button = styled.button`
    padding: 10px 20px 10px 20px;
    width: 100%;

    border: 1px solid lightgray;
    border-radius: 10px;

    font-weight: 900;

    background-color: hsl(184, 75%, 60%);
    cursor: pointer;

    &:hover {
        background-color: hsl(184, 100%, 60%);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    justify-content: center;
    align-items: center;

    padding: 10px;
`;

const PrimaryButton = styled(Button)``;
const NegativeButton = styled(Button)`
    background-color: hsl(0, 50%, 50%);
    cursor: pointer;

    &:hover {
        background-color: hsl(0, 100%, 50%);
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid lightgray;
`;
const Title = styled.p`
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 900;

    cursor: pointer;
`;

export default Settings;
