
import React from 'react';
import styled from 'styled-components';

export default function Confirmation({ message, onConfirm }) {
    return (
        <Container>
            <Message>{message}</Message>
            <ButtonGroup>
                <Button onClick={() => onConfirm(true)}>Confirm</Button>
                <Button onClick={() => onConfirm(false)}>Cancel</Button>
            </ButtonGroup>
        </Container>
    );
}

const Container = styled.div``;
const Message = styled.p``;
const Button = styled.button``;
const ButtonGroup = styled.div``;
