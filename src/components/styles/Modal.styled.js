import styled from "styled-components";

export const Modal = styled.div`
    display: ${({ show }) => (show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 100;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.8);
`;