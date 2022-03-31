import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useCharacter from '../components/hooks/useCharacter';
import { Error } from '../components/styles/Error.styled';

const CharacterSummary = () => {
    const { id } = useParams();
    const { error, loading, data } = useCharacter(id);

    return (
        <Container>
            {error ? (
                <Error>Error loading the character</Error>
            ) : data ? (
                <ResultContainer>
                    <ProfileContainer>
                        <Image src={data.character.image} />
                        <Name>{data.character.name} </Name>
                    </ProfileContainer>
                    <SummaryContainer>
                        <SummaryItem>
                            <SummaryName>Something</SummaryName>
                            <SummaryDescription>Sdsadas</SummaryDescription>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryName>Something</SummaryName>
                            <SummaryDescription>Sdsadas</SummaryDescription>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryName>Something</SummaryName>
                            <SummaryDescription>Sdsadas</SummaryDescription>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryName>Something</SummaryName>
                            <SummaryDescription>Sdsadas</SummaryDescription>
                        </SummaryItem>
                    </SummaryContainer>
                </ResultContainer>
            ) : (
                <Spinner animation='grow' variant='dark' />
            )}
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;

    padding-top: 20px;
    padding-left: 300px;
    padding-right: 50px;

    @media (max-width: 1028px) {
        
    }
`;
const ResultContainer = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
    min-width: min-content;
    max-height: 400px;

    padding: 50px;

    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);

    background-color: hsl(216, 41%, 5%, 0.7);

`;
const Image = styled.img`
    height: 300px;
    width: 300px;
    border-radius: 20px;
`;
const Name = styled.p`
    font-size: 3rem;
    color: white;
`;
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const SummaryContainer = styled.div``;
const SummaryItem = styled.div``;
const SummaryName = styled.p`
    color: white;
`;
const SummaryDescription = styled.p`
    color: white;
`;

export default CharacterSummary;
