import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Web3 from 'web3';
import Eth from 'web3-eth';

export const BlockchainNetworkContext = createContext();
const defaultProvider = 'wss://speedy-nodes-nyc.moralis.io/f21c061f796d5011345dd3cd/bsc/mainnet/ws';

const BlockchainNetworkProvider = ({ children }) => {
    const [eth, setEth] = useState(window.ethereum);
    const [accounts, setAccounts] = useState([]);

    const [network, setNetwork] = useState({
        blockchain: 'binance',
        getFetcherUrl: tokenAddress => `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`,
        web3: new Web3(defaultProvider),
        eth: new Eth(defaultProvider),
    });

    const handleAccountChange = newAccounts => {
        setAccounts(newAccounts);
    };

    useEffect(() => {
        eth.on('accountsChanged', handleAccountChange);

        return () => eth.removeListener('accountsChanged', handleAccountChange);
    }, []);

    const connect = async () => {
        if (accounts.length) return;
        if (!eth) return;

        try {
            setAccounts(await eth.request({ method: 'eth_accounts' }));
        } catch (err) {
            alert(err);
        }
    };

    const disconnect = () => {
        setAccounts([]);
    };

    return (
        <BlockchainNetworkContext.Provider value={{ network, eth, accounts, connect, disconnect }}>
            {children}
        </BlockchainNetworkContext.Provider>
    );
};

export default BlockchainNetworkProvider;
