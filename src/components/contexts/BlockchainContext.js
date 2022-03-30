import { useEffect, useReducer, useState } from 'react';
import { createContext } from 'react';
import Web3 from 'web3';
import usePersist from '../hooks/usePersist';

export const BlockchainContext = createContext();

const defaultProviders = ['wss://young-proud-lake.bsc.quiknode.pro/2b606bf9c9bf278fee8c4aaa347f660237e52e06/'];

const BlockchainProvider = ({ children }) => {
    const [eth, setEth] = useState(window.ethereum);
    const [account, setAccount] = usePersist('currentAccount');
    const [balance, setBalance] = usePersist('currentBalance');
    const [connected, setConnected] = usePersist('connectedToApp', false);
    const [canConnect, setCanConnect] = useState('canConnectToApp', true);
    const [providers, setProviders] = usePersist('defaultProviders', defaultProviders);
    const [provider, setProvider] = usePersist('chosenProvider', defaultProviders[0]);

    const handleAccountChange = async () => {
        setAccount(eth.selectedAddress);
        setBalance(await getFormattedBalance());
    };

    useEffect(() => {
        if (!eth) return setCanConnect(false);
        eth.on('accountsChanged', handleAccountChange);

        return () => eth.removeListener('accountsChanged', handleAccountChange);
    }, []);

    const connect = async () => {
        if (account) return;
        if (!eth) return;

        try {
            await eth.request({ method: 'eth_requestAccounts' });
            setAccount(eth.selectedAddress);
            setBalance(await getFormattedBalance(eth.selectedAddress));
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

    // GET ETH BALANCE

    const getBalance = async address => {
        return await eth.request({ method: 'eth_getBalance', params: [address] });
    };

    const getFormattedBalance = async address => {
        if (!address) return;

        const web3 = new Web3(provider);

        if (!web3) return;

        return parseFloat(web3.utils.fromWei(await getBalance(address), 'ether')).toFixed(4);
    };

    // GET ETH BALANCE

    // SMART CONTRACT FACTORY

    const getContract = (abi, tokenAddress, defaultParams = {}) => {
        const web3 = new Web3(provider);
        if (!web3 || !web3.utils.isAddress(tokenAddress)) return;
        return new web3.eth.Contract(abi, tokenAddress, defaultParams);
    };

    // SMART CONTRACT FACTORY

    const blockchain = {
        providers,
        balance,
        connected,
        canConnect,
        connect,
        disconnect,
        getContract
    };

    return <BlockchainContext.Provider value={blockchain}>{children}</BlockchainContext.Provider>;
};

export default BlockchainProvider;
