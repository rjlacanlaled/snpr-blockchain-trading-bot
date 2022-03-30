import { useEffect, useState } from 'react';
import { GiLaserGun } from 'react-icons/gi';
import { FaExchangeAlt } from 'react-icons/fa';
import { RiExchangeDollarFill, RiRobotLine } from 'react-icons/ri';
import { AiOutlineLineChart, AiOutlineRobot } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    useEffect(() => {
        console.log(location.pathname);
        setActive(location.pathname);
        console.log(active);
    }, [location]);

    return (
        <Container>
            <LogoContainer>
                <StyledGiLaserGun />
                <TextContainer>
                    <CryptoText>CRYPTO</CryptoText>
                    <SniprText>snpr</SniprText>
                </TextContainer>
            </LogoContainer>
            <LinksContainer>
                <LinkItem active={active} key='/' path='/'>
                    <StyledLink to='/'>
                        <Label>Exchange</Label>
                        <StyledFaExchangeAlt />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/auto' path='/auto'>
                    <StyledLink to='auto'>
                        <Label>Auto Trade</Label>
                        <StyledAiOutlineRobot />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/limit' path='/limit'>
                    <StyledLink to='limit'>
                        <Label>Limit Order</Label>
                        <StyledAiOutlineLineChart />
                    </StyledLink>
                </LinkItem>
            </LinksContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    min-height: 100vh;
    width: 250px;
    padding: 20px;
    gap: 70px;
    z-index: 10;

    background-color: hsl(216, 41%, 15%, 0.9);
`;
const LogoContainer = styled.div`
    display: flex;

    width: 100%;
`;
const TextContainer = styled.div`
    line-height: 15px;
`;

const CryptoText = styled.p`
    color: white;
    font-size: 0.8rem;
`;
const SniprText = styled.p`
    color: white;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 5px;
`;

const LinksContainer = styled.ul`
    padding: 10px;
`;
const LinkItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    height: 40px;
    border-radius: 10px;

    background-color: ${({ active, path }) => (active === path ? 'rgb(128, 128, 128, 0.2)' : 'transparent')};
    cursor: pointer;

    p,
    a {
        color: ${({ active, path }) => (active === path ? 'hsl(194, 81%, 46%)' : 'gray')};
    }

    &:hover {
        background-color: rgb(128, 128, 128, 0.2);

        p,
        a {
            color: hsl(194, 81%, 46%);
        }
    }
`;
const StyledLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    align-items: center;

    gap: 8px;

    font-size: 1rem;
    font-weight: 400;
`;

const Label = styled.p``;

// ICONS

const StyledGiLaserGun = styled(GiLaserGun)`
    font-size: 2.4rem;
    color: hsl(0, 0%, 100%);
`;

const StyledFaExchangeAlt = styled(FaExchangeAlt)``;
const StyledAiOutlineRobot = styled(AiOutlineRobot)``;
const StyledAiOutlineLineChart = styled(AiOutlineLineChart)``;

export default Sidebar;
