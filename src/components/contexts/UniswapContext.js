import { createContext } from 'react';
import useBlockchain from '../hooks/useBlockchain';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import usePersist from '../hooks/usePersist';
import { ethers } from 'ethers';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@pancakeswap-libs/sdk-v2';

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const defaultGasPrice = ethers.utils.parseUnits('5', 'gwei');
const defaultGas = ethers.utils.parseUnits('500000', 'wei');

const UniswapProvider = ({ children }) => {
    const { getContract, provider } = useBlockchain;
    const [router, setRouter] = usePersist('uniswapRouter', defaultRouter);

    const getUniswapContract = ({ from, gas = defaultGas, gasPrice = defaultGasPrice }) => {
        return getContract(pancakeswapAbi, router, { from, gas, gasPrice });
    };

    const getAmountOutMin = async (wallet, amountIn, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage) => {
        try {
            const slippageTolerance = new Percent(Math.floor(slippage * 100).toString(), '10000');
            const tokenA = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenIn), tokenInDecimal);
            const tokenB = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenOut), tokenOutDecimal);
            const pair = await Fetcher.fetchPairData(tokenA, tokenB, wallet.connect(provider));
            const route = new Route([pair], tokenA);
            const trade = new Trade(route, new TokenAmount(tokenA, amountIn), TradeType.EXACT_INPUT);
            const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();
            const formattedAmountOutMin = ethers.formatUnits(amountOutMin, tokenOutDecimal);

            return { amountOutMin, formattedAmountOutMin };
        } catch (ex) {
            throw new Error('Error fetching amount out min');
        }
    };

    const uniswap = {
        getUniswapContract,
        getAmountOutMin,
        setRouter,
    };

    return <UniswapContext.Provider value={{ uniswap }}>{children}</UniswapContext.Provider>;
};

export default UniswapProvider;
