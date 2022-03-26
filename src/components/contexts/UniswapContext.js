import { createContext, useEffect, useState } from 'react';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import uniswapAbi from '../..//data/uniswap-router-v3-abi.json';

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

const UniswapContextProvider = ({ children }) => {
    const { network, account } = useBlockchainNetwork();
    const [router, setRouter] = useState(
        new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, { from: account })
    );

    useEffect(() => {
        setRouter(new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, { from: account }));
    }, [account, network]);

    const swapTokensForExactTokens = async () => {
        const tx = await router.swapTokensForExactTokens();
        console.log(tx);
    };

    return <UniswapContext.Provider value={{ router, swapTokensForExactTokens }}>{children}</UniswapContext.Provider>;
};

export default UniswapContextProvider;
