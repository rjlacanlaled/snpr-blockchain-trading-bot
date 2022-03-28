import styled from 'styled-components';

const StatusBox = ({ status }) => {
    return (
        <Container>
            <Message>{status}</Message>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    background-color: lightgray;
    max-height: 100px;
    min-width: 300px;

    font-weight: 900;

    background-color: lightgray;
    opacity: 0.8;

    border-radius: 20px;
`;
const Message = styled.p``;

export default StatusBox;
