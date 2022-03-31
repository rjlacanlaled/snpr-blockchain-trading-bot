import styled from 'styled-components';

const CharacterId = ({ image, name }) => {
    <Container>
        <Image src={image} />
        <Name>{name}</Name>
    </Container>;
};

const Container = styled.div``;
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

export default CharacterId;
