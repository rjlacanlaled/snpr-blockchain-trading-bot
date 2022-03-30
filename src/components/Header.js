import styled from 'styled-components';
import { RiSettings4Fill } from 'react-icons/ri';

const Header = () => {
    return (
        <Container>
            <ConnectWalletButton>Connect wallet</ConnectWalletButton>
            <StyledRiSettings4Fill />
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    padding-right: 4rem;

    background-color: hsl(216, 41%, 10%, 0.5);

    height: 90px;
`;

const ConnectWalletButton = styled.button`
    cursor: pointer;
    font-weight: 500;
    padding: 12px 20px 12px 20px;
    border-radius: 10px 20px 10px 20px;
    background-color: rgb(23, 169, 214, 0.2);
    color: hsl(194, 81%, 50%);
    border-style: none;

    &:hover {
        border: 1px solid;
    }
`;

const StyledRiSettings4Fill = styled(RiSettings4Fill)`
    cursor: pointer;
    font-size: 2.2rem;
    color: rgb(128, 128, 128);
    background-color: rgb(128, 128, 128, 0.1);
    padding: 5px;
    border-radius: 5px;

    &:hover {
        background-color: rgb(0, 0, 0, 0.4);
    }
`;

export default Header;
