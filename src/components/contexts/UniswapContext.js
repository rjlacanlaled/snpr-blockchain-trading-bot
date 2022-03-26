import { createContext } from 'react';

export const UniswapContext = createContext();

const UniswapContextProvider = ({ children }) => {
    return <UniswapContext.Provider>{children}</UniswapContext.Provider>;
};


export default UniswapContextProvider;
