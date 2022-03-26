import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Web3 from 'web3';
import Eth from 'web3-eth';

export const BlockchainNetworkContext = createContext();
const defaultProvider = 'wss://speedy-nodes-nyc.moralis.io/f21c061f796d5011345dd3cd/bsc/mainnet/ws';

const BlockchainNetworkProvider = ({ children }) => {
    const [eth, setEth] = useState(window.ethereum);
    const [account, setAccount] = useState();
    const [balance, setBalance] = useState(0);
    const [connected, setConnected] = useState(false);

    const [network, setNetwork] = useState({
        blockchain: 'binance',
        getFetcherUrl: tokenAddress => `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`,
        web3: new Web3(defaultProvider),
        eth: new Eth(defaultProvider),
    });

    const handleAccountChange = async () => {
        setAccount(eth.selectedAddress);
        setBalance(await getFormattedBalance());
    };

    useEffect(() => {
        eth.on('accountsChanged', handleAccountChange);

        return () => eth.removeListener('accountsChanged', handleAccountChange);
    }, []);

    const connect = async () => {
        if (account) return;
        if (!eth) return;

        try {
            await eth.request({ method: 'eth_accounts' });
            setAccount(eth.selectedAddress);
            setBalance(await getFormattedBalance());
            setConnected(true);
        } catch (err) {
            console.log(err);
        }
    };

    const disconnect = () => {
        setAccount();
        setBalance(0);
        setConnected(false);
    };

    const getFormattedBalance = async () => {
        return parseFloat(network.web3.utils.fromWei(await getBalance(), 'ether')).toFixed(4);
    };

    const getBalance = async () => {
        console.log(eth.selectedAddress);
        return await eth.request({ method: 'eth_getBalance', params: [eth.selectedAddress] });
    };

    return (
        <BlockchainNetworkContext.Provider value={{ network, eth, account, connect, disconnect, balance, connected }}>
            {children}
        </BlockchainNetworkContext.Provider>
    );
};

export default BlockchainNetworkProvider;
