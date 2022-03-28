import { createContext, useEffect, useState } from 'react';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import uniswapAbi from '../..//data/uniswap-router-v3-abi.json';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } from '@pancakeswap-libs/sdk-v2';
import { defaultTo } from 'eth/core';

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

    const swapExactTokensForTokens = async (amountIn, tokenIn, tokenOut, slippage, gasPrice, gasLimit, deadline) => {
        const tx = await router.methods
            .swapExactTokensForTokens(0.001, 12, 'dsadasdsadas', 'dsadasdas', 'dasdsadsad')
            .estimateGas();
    };

    const swapEthForExactTokens = async () => {};

    const swapExactTokensForETHSupportingFeeOnTransferTokens = (
        amountIn,
        tokenIn,
        tokenOut,
        slippage,
        gasPrice,
        gasLimit,
        deadline
    ) => {};

    const getDefaultFromToken = () => {
        const defaultFromToken = JSON.parse(localStorage.getItem('defaultBuyToken'));
        if (defaultFromToken == 'undefined') return '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
        return defaultFromToken;
    };

    const getDefaultToToken = () => {
        const defaultToToken = JSON.parse(localStorage.getItem('defaultSellToken'));
        if (defaultToToken == 'undefined') return '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
        return defaultToToken;
    };

    return (
        <UniswapContext.Provider
            value={{
                router,
                getDefaultFromToken,
                getDefaultToToken,
                swapExactTokensForTokens,
                swapExactTokensForETHSupportingFeeOnTransferTokens,
            }}
        >
            {children}
        </UniswapContext.Provider>
    );
};

export default UniswapContextProvider;
