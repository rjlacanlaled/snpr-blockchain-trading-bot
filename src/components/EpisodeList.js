import styled from 'styled-components';
import EpisodeBox from './EpisodeBox';

const EpisodeList = ({ episodes }) => {
    return (
        <Container>
            {episodes.length && <Title>Episodes</Title>}
            <List>
                {episodes.map(({ name, air_date }) => (
                    <EpisodeBox key={name} name={name} date={air_date} />
                ))}
            </List>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 10px 30px 10px;
    border-radius: 30px;
    max-width: 800px;

    background-color: rgb(0, 0, 0, 0.5);
`;
const List = styled.div`
    display: flex;

    gap: 5px;
    overflow: auto;
`;

export default EpisodeList;
