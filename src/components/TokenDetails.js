import styled from 'styled-components';

const TokenBox = ({ onChooseToken }) => {
    const [tokenAddress, setTokenAddress] = useState();
    const [tokenName, setTokenName] = useState();

    return (
        <Container>
            <BasicDetails>
                <TokenLogo />
                <TokenName></TokenName>
            </BasicDetails>
        </Container>
    );
};

const Container = styled.div``;
const BasicDetails = styled.div``;
const TokenLogo = styled.img``;
const TokenName = styled.p``;
export default TokenBox;
