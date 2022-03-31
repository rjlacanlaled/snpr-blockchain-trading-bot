import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EpisodeBox from '../components/EpisodeBox';
import useCharacter from '../components/hooks/useCharacter';
import { Error } from '../components/styles/Error.styled';

const CharacterSummary = () => {
    const { id } = useParams();
    const { error, loading, data } = useCharacter(id);

    // name
    // status
    // species
    // type
    // gender
    // image
    // episode {
    //     name
    //     air_date
    // }

    return (
        <Container>
            {error ? (
                <Error>Error loading the character</Error>
            ) : data ? (
                <ContentContainer>
                    <ResultContainer>
                        <ProfileContainer>
                            <Image src={data.character.image} />
                            <Name>{data.character.name} </Name>
                        </ProfileContainer>
                        <SummaryContainer>
                            <SummaryItem>
                                <SummaryName>Status</SummaryName>
                                <SummaryDescription>{data.character.status}</SummaryDescription>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryName>Species</SummaryName>
                                <SummaryDescription>{data.character.species}</SummaryDescription>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryName>Created</SummaryName>
                                <SummaryDescription>
                                    {new Date(data.character.created).toLocaleDateString()}
                                </SummaryDescription>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryName>Gender</SummaryName>
                                <SummaryDescription>{data.character.gender}</SummaryDescription>
                            </SummaryItem>
                        </SummaryContainer>
                    </ResultContainer>

                    <EpisodeContainer>
                        {data.character.episode.length && <EpisodeLabel>Episodes</EpisodeLabel>}
                        <Episodes>
                            {data.character.episode.map(item => (
                                <EpisodeBox key={item.name} name={item.name} date={item.air_date} />
                            ))}
                        </Episodes>
                    </EpisodeContainer>
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
    font-size: 3rem;
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
const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;
const SummaryItem = styled.div`
    display: flex;
    gap: 30px;

    justify-content: space-between;

    width: 100%;
    padding-bottom: 10px;
    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
`;
const SummaryName = styled.p`
    color: white;
    font-size: 2rem;
    flex: 1 0 25%;
    color: hsl(160, 100%, 40%);
`;
const SummaryDescription = styled.p`
    color: white;
    font-size: 2rem;
    flex: 1 50%;
    font-weight: 300;
`;

const EpisodeLabel = styled.h2`
    font-size: 2rem;
    color: hsl(0, 0%, 80%);

    border-bottom: 1px solid rgb(180, 180, 180, 0.4);
    padding-bottom: 20px;
`;

const EpisodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 10px 30px 10px;
    border-radius: 30px;
    max-width: 800px;

    background-color: rgb(0, 0, 0, 0.5);
`;

const Episodes = styled.div`
    display: flex;

    gap: 5px;
    overflow: auto;
`;

export default CharacterSummary;
