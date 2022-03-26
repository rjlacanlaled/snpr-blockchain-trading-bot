import { createContext, useEffect, useState } from 'react';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import uniswapAbi from '../..//data/uniswap-router-v3-abi.json';

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

const UniswapContextProvider = ({ children }) => {
    const { network, account, getTokenBalance } = useBlockchainNetwork();
    const [router, setRouter] = useState(
        new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, { from: account })
    );

    useEffect(() => {
        setRouter(new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, { from: account }));
    }, [account, network]);

    const swapExactTokensForTokens = async () => {
        const tx = await router.methods.swapExactTokensForTokens(0.001, 12, 'dsadasdsadas', 'dsadasdas', 'dasdsadsad').estimateGas();
    };

    return <UniswapContext.Provider value={{ router, swapExactTokensForTokens }}>{children}</UniswapContext.Provider>;
};

export default UniswapContextProvider;
