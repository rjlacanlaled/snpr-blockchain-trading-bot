import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PageSelection = () => {
    const location = useLocation();

    const [active, setActive] = useState(location.pathname);

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    return (
        <Container>
            <LinkList>
                <LinkItem key='/'>
                    <StyledLink active={active} to='/'>
                        Trade
                    </StyledLink>
                </LinkItem>
                <LinkItem key='/order'>
                    <StyledLink active={active} to='/order'>
                        Limit Order
                    </StyledLink>
                </LinkItem>
                <LinkItem key='/auto'>
                    <StyledLink active={active} to='/auto'>
                        Auto Trade
                    </StyledLink>
                </LinkItem>
            </LinkList>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
`;

export const StyledLink = styled(Link)`
    font-size: 1rem;
    font-weight: ${({ to, active }) => (active == to ? '900' : '300')};
    border-bottom: ${({ to, active }) => (active == to ? '3px solid #4BDBE6' : 'none')};
   // color: ${({ to, active }) => (active == to ? `hsl(259, 100%, 21%)` : `hsl(259, 50%, 21%)`)};
`;

const LinkList = styled.ul`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
`;
const LinkItem = styled.li`
    list-style: none;
`;

export default PageSelection;
