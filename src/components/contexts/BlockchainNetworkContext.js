import { createContext } from 'react';

export const BlockchainNetworkContext = createContext();

const BlockchainNetworkProvider = ({ children }) => {
    const [network, setNetwork] = useState('');

    return (
        <BlockchainNetworkContext.Provider value={{ network, setNetwork }}>
            {children}
        </BlockchainNetworkContext.Provider>
    );
}

export default BlockchainNetworkProvider;
