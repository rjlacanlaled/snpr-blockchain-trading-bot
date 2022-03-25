import { createContext } from 'react';

export const BlockchainNetworkContext = createContext();

const BlockchainNetworkProvider = ({ children }) => {
    const [network, setNetwork] = useState({
        blockchain: 'binance',
        getFetcherUrl: tokenAddress => `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`,
    });

    return <BlockchainNetworkContext.Provider value={network}>{children}</BlockchainNetworkContext.Provider>;
};

export default BlockchainNetworkProvider;
