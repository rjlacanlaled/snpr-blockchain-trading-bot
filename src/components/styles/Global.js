import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        font-family: 'Roboto', sans-serif;
        color: #280E5F;

        text-decoration: none;

    }

    body {
        height: 100vh;
        width: 100vw;
    }

`;

export default Global;
