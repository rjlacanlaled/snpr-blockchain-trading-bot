import { CircularProgress, Grow, Fade, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CharacterDetails from '../components/CharacterDetails';
import DetailItem from '../components/DetailItem';
import EpisodeBox from '../components/EpisodeBox';
import EpisodeList from '../components/EpisodeList';
import useCharacter from '../components/hooks/useCharacter';
import { Error } from '../components/styles/Error.styled';

const CharacterSummary = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { error, loading, data } = useCharacter(id);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (data) setLoad(true);
    }, [data, load]);

    return (
        <Container>
            {error ? (
                <Error>Error loading the character, retry later.</Error>
            ) : data ? (
                <ContentContainer>
                    <BackButton onClick={() => navigate('/graphql')}>Back to Main Page</BackButton>
                    <ResultContainer>
                        <ProfileContainer>
                            <Grow in={load}>
                                <Image src={data.character.image} />
                            </Grow>
                            <Fade in={load}>
                                <Name>{data.character.name}</Name>
                            </Fade>
                        </ProfileContainer>
                        <CharacterDetails
                            status={data.character.status}
                            species={data.character.species}
                            created={data.character.created}
                            gender={data.character.gender}
                        />
                    </ResultContainer>

                    <EpisodeList episodes={data.character.episode} />
                </ContentContainer>
            ) : (
                <CircularProgress color='success' />
            )}
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    padding-left: 300px;
    padding-right: 50px;
    padding-top: 50px;
    padding-bottom: 50px;

    overflow: auto;

    background-image: url('/assets/green-background.jpg');
    background-size: cover;

    @media (max-width: 1028px) {
        padding-left: 50px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const ResultContainer = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
    max-height: 400px;

    padding: 50px;

    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);

    background-color: hsl(216, 41%, 5%, 0.7);
`;
const Image = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 500px;
`;
const Name = styled.p`
    font-size: 1.5rem;
    font-weight: 900;
    color: white;

    text-align: center;
`;
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const EpisodeLabel = styled.h2`
    font-size: 2rem;
    color: hsl(0, 0%, 80%);

    border-bottom: 1px solid rgb(180, 180, 180, 0.4);
    padding-bottom: 20px;
`;

const BackButton = styled.button`
    cursor: pointer;
    max-width: 300px;
    padding: 10px 20px 10px 20px;
    font-size: 2rem;
    font-weight: 300;
    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);

    background-color: hsl(216, 41%, 5%, 0.7);
    color: hsl(0, 0%, 80%);
    align-self: flex-end;

    &:hover {
        background-color: hsl(216, 41%, 5%, 0.2);
        color: hsl(0, 0%, 90%);
    }
`;

export default CharacterSummary;
