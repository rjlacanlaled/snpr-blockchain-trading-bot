import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Web3 from 'web3';
import Eth from 'web3-eth';
import erc20Abi from '../../data/erc-20-abi.json';
import { ethers } from 'ethers';

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
        wallet: null,
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
            await eth.request({ method: 'eth_requestAccounts' });
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
        return await eth.request({ method: 'eth_getBalance', params: [eth.selectedAddress] });
    };

    const getContract = (abi, tokenAddress, defaultParams = {}) => {
        if (!network.web3.utils.isAddress(tokenAddress)) return;
        return new network.web3.eth.Contract(abi, tokenAddress, defaultParams);
    };

    const getTokenBalance = async tokenAddress => {
        if (!network.web3.utils.isAddress(tokenAddress)) return 0;
        const contract = getContract(erc20Abi, tokenAddress);
        return await contract.methods.balanceOf(eth.selectedAddress).call();
    };

    const getFormattedTokenBalance = async tokenAddress => {
        if (!connected) return;
        if (!network.web3.utils.isAddress(tokenAddress)) return 0;
        const contract = getContract(erc20Abi, tokenAddress);
        const balance = await getTokenBalance(tokenAddress);
        const decimal = await contract.methods.decimals().call();
        const floatBalance = parseFloat(ethers.utils.formatEther(balance, decimal));
        return floatBalance > 0 ? floatBalance.toFixed(2) : floatBalance.toFixed(6);
    };

    return (
        <BlockchainNetworkContext.Provider
            value={{
                network,
                eth,
                account,
                connect,
                disconnect,
                balance,
                connected,
                getTokenBalance,
                getFormattedTokenBalance,
            }}
        >
            {children}
        </BlockchainNetworkContext.Provider>
    );
};

export default BlockchainNetworkProvider;
