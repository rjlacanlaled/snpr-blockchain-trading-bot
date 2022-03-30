import { createContext } from 'react';
import useLocalStorageDatabase from '../hooks/useLocalStorageDatabase';

export const TokenDetailsContext = createContext();

const sampleTokenDetailsDatabase = [
    { 
        symbol: 'WBNB',
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        
    }
];

const TokenDetailsProvider = ({ children }) => {
    const tokenDatabase = useLocalStorageDatabase('tokenDatabase');

    return (
        <TokenDetailsContext.Provider value={(tokenDatabase, getTokenDetails)}>{children}</TokenDetailsContext.Provider>
    );
};
