import styled from 'styled-components';
import useTokenDetails from './hooks/useTokenDetails';

const SearchToken = ({ onTokenConfirm }) => {
    const [address, setAddress] = useState('');
    const [tokenDetail, setTokenDetails] = useTokenDetails(address);

    return (
        <Container>
            <AddressInput />
        </Container>
    );
};

const Container = styled.div``;
const AddressInput = styled.input``;

export default SearchToken;
