import { useEffect } from 'react';
import styled from 'styled-components';

const StatusBox = ({ statusList }) => {
    useEffect(() => {
        console.log(statusList);
    }, [statusList]);

    return (
        <Container>
            {statusList.length > 0  && statusList.map(status => <Message key={status}>{status}</Message>) }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    text-align: center;
    background-color: lightgray;
    min-height: 300px;
    max-width: 300px;

    font-weight: 900;

    background-color: lightgray;
    opacity: 0.8;

    overflow: auto;

    border-radius: 20px;
`;
const Message = styled.p`
    font-size: 0.5rem;
    text-align: left;
`;

export default StatusBox;
