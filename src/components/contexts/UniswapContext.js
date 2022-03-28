import { createContext, useEffect, useState } from 'react';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import uniswapAbi from '../..//data/uniswap-router-v3-abi.json';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@pancakeswap-libs/sdk-v2';
import { ethers } from 'ethers';
import useFloat from '../hooks/useFloat';
import { update } from 'eth/core';

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

const UniswapContextProvider = ({ children }) => {
    const { network, account, getTokenBalance, getTokenDecimal, eth } = useBlockchainNetwork();
    const [router, setRouter] = useState();

    useEffect(() => {
        updateRouter();
    }, []);

    useEffect(() => {
        setRouter(new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, { from: account }));
    }, [account, network]);

    const updateRouter = () => {
        const contract = new network.web3.eth.Contract(pancakeswapAbi, defaultRouter, {
            from: process.env.REACT_APP_WALLET_ADDRESS,
            gasPrice: JSON.parse(localStorage.getItem('gasFee')),
            gas: JSON.parse(localStorage.getItem('gasLimit')),
        });

        setRouter(contract);
    };

    const swapExactTokensForTokens = async (amountIn, tokenIn, tokenOut, slippage, gasPrice, gasLimit, deadline) => {
        const tx = await router.methods
            .swapExactTokensForTokens(0.001, 12, 'dsadasdsadas', 'dsadasdas', 'dasdsadsad')
            .estimateGas();
    };

    const swapEthForExactTokens = async () => {};

    const sendTransaction = async (amountIn, tokenIn, tokenOut, slippage, gasPrice, gasLimit, deadline) => {
        let parsedGas, parsedGasPrice;

        console.log(gasPrice);

        try {
            parsedGas = ethers.utils.parseUnits(gasLimit.toString(), 'wei');
            parsedGasPrice = ethers.utils.parseUnits('5', 'gwei');
        } catch (ex) {
            console.log(ex.toString());
        }

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '8000', // customizable by user during MetaMask confirmation.
            gas: '5', // customizable by user during MetaMask confirmation.
            to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
            from: account, // must match user's active address.
            value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await eth.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    };

    const swapExactTokensForTokensSupportingFeeOnTransferTokens = async (
        amountIn,
        tokenIn,
        tokenOut,
        slippage,
    ) => {
        const tokenInDecimal = await getTokenDecimal(tokenIn);
        const tokenOutDecimal = await getTokenDecimal(tokenOut);
        const parsedAmountIn = ethers.utils.parseUnits(amountIn, tokenInDecimal);

        const tradeDetails = await getTradeDetails(
            parsedAmountIn,
            tokenIn,
            tokenInDecimal,
            tokenOut,
            tokenOutDecimal,
            parseFloat(slippage)
        );

        if (tradeDetails[0] < 1) return false;

        const { trade, slippageTolerance } = tradeDetails[1];
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();

        try {
            updateRouter();
            const tx = await router.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                parsedAmountIn,
                amountOutMin,
                [tokenIn, tokenOut],
                process.env.REACT_APP_WALLET_ADDRESS,
                parseFloat('1000000') * 60000
            );

            const gas = await tx.estimateGas();

            const transactionRouter = getTransactionRouter();

            const parsedGasPrice = ethers.utils.parseUnits(JSON.parse(localStorage.getItem('gasFee')), 'gwei');
            const parsedGasLimit = ethers.utils.parseUnits(
                (gas + parseFloat(JSON.parse(localStorage.getItem('gasLimit')))).toString(),
                'wei'
            );

            const executeTx = await transactionRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                parsedAmountIn,
                amountOutMin,
                [tokenIn, tokenOut],
                process.env.REACT_APP_WALLET_ADDRESS,
                Math.floor(Date.now() / 1000) + 60 * 20,
                {
                    gasLimit: parsedGasLimit,
                    gasPrice: parsedGasPrice,
                }
            );
            

            console.log(executeTx);
        } catch (err) {
            console.log(err.toString());
        }
    };


    const getTransactionRouter = () => {
        const routerContract = new ethers.Contract(defaultRouter, pancakeswapAbi, network.wallet.connect(network.provider));

        return routerContract;
    };

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

    const getFormmatedTradeInputs = async (amountIn, tokenIn, tokenOut) => {
        console.log('amountIn', amountIn);
        const tokenInDecimal = await getTokenDecimal(tokenIn);
        const tokenOutDecimal = await getTokenDecimal(tokenOut);
        const parsedAmountIn = ethers.utils.parseUnits(amountIn, tokenInDecimal);

        return {tokenInDecimal, tokenOutDecimal, parsedAmountIn};
    }

    const getTradeDetails = async (amountIn, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage) => {

        console.log({amountIn, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage});
        
        try {
            const slippageTolerance = new Percent(Math.floor(slippage * 100).toString(), '10000');

            const tokenA = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenIn), tokenInDecimal);

            const tokenB = new Token(ChainId.MAINNET, ethers.utils.getAddress(tokenOut), tokenOutDecimal);

            const pair = await Fetcher.fetchPairData(tokenA, tokenB, network.wallet.connect(network.provider));
            const route = new Route([pair], tokenA);
            const trade = new Trade(route, new TokenAmount(tokenA, amountIn), TradeType.EXACT_INPUT);
            console.log(tokenOutDecimal);
            const amountOutMin = ethers.utils.formatUnits(trade.minimumAmountOut(slippageTolerance).raw.toString(), tokenOutDecimal);
            console.log(amountOutMin);

            return [1, { trade, slippageTolerance, amountOutMin }];
        } catch (ex) {
            console.log(ex.toString());
            return [-1, ex.toString()];
        }
    };

    return (
        <UniswapContext.Provider
            value={{
                router,
                setRouter,
                getDefaultFromToken,
                getDefaultToToken,
                swapExactTokensForTokens,
                swapExactTokensForTokensSupportingFeeOnTransferTokens,
                sendTransaction,
                updateRouter,
                getFormmatedTradeInputs,
                getTradeDetails
                
            }}
        >
            {children}
        </UniswapContext.Provider>
    );
};

export default UniswapContextProvider;
