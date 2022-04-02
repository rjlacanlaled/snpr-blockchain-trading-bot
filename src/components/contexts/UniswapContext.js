import { createContext } from 'react';
import useBlockchain from '../hooks/useBlockchain';
import pancakeswapAbi from '../../data/pancakeswap-router-v2-abi.json';
import usePersist from '../hooks/usePersist';
import { ethers } from 'ethers';
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@pancakeswap-libs/sdk-v2';

import erc20abi from '../../data/erc-20-abi.json';
import Web3 from 'web3';
import abiDecoder from 'abi-decoder';

export const UniswapContext = createContext();

const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const defaultGasPrice = ethers.utils.parseUnits('5', 'gwei');
const defaultGas = ethers.utils.parseUnits('500000', 'wei');

const UniswapProvider = ({ children }) => {
    const { getContract, provider, getContractWithSigner, isValidAddress } = useBlockchain();
    const [router, setRouter] = usePersist('uniswapRouter', defaultRouter);

    console.log(router);

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

    const getAllowance = async tokenAddress => {
        if (!isValidAddress(tokenAddress)) return;
        try {
            const contract = getContract(erc20abi, tokenAddress);
            const allowance = await contract.methods.allowance(process.env.REACT_APP_WALLET_ADDRESS, router).call();
            return allowance;
        } catch (err) {
            return new Error('Cannot get allowance!');
        }
    };

    const hasAllowance = async tokenAddress => {
        if (!isValidAddress(tokenAddress)) return false;
        const allowance = await getAllowance(tokenAddress);
        return !ethers.BigNumber.from(allowance).isZero();
    };

    const approveToSpend = async tokenAddress => {
        // try {
        //     const web3 = new Web3(provider);
        //     const gasPrice = await web3.eth.getGasPrice();
        //     const gas = await web3.eth.estimateGas().call();

        //     // const contract = getContractWithSigner(erc20abi, tokenAddress);

        //     // const spendAmount = ethers.utils.parseEther('1000000000000000000000000000000');
        //     // console.log('hasjdhajkshkdjhasjkdhjkashkj')
        //     // console.log(spendAmount);
        //     // const approve = contract.approve(router, spendAmount, {
        //     //     gasPrice,
        //     //     gasLimit: ethers.parseUnits('10000000', 'wei'),
        //     // });

        //     //const web3 = new Web3(provider);
        //     const mnemonic = ethers.Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC).privateKey;

        //     const contract = getContract(erc20abi, tokenAddress, {
        //         from: process.env.REACT_APP_WALLET_ADDRESS,
        //     });
        //     const spendAmount = ethers.utils.parseUnits('999999999999999999999999999999999999999999', '18');
          
        //     const approve = await contract.methods.approve(router, spendAmount);

        //     const txx = {
        //         from: process.env.REACT_APP_WALLET_ADDRESS,
        //         to: tokenAddress,
        //         gas,
        //         gasPrice,
        //         data: approve,
        //     };
        //     console.log('here');

        //     const sign = await web3.eth.accounts.signTransaction(txx, mnemonic);
        //     const tx = await web3.eth.sendSignedTransaction(sign.rawTransaction);
        //     console.log(tx);
        //     return approve;
        // } catch (err) {
        //     console.log(err);
        //     throw new Error('Cannot approve spender');
        // }
    };

    const uniswap = {
        getUniswapContract,
        getAmountOutMin,
        hasAllowance,
        approveToSpend,
        setRouter,
    };

    return <UniswapContext.Provider value={uniswap}>{children}</UniswapContext.Provider>;
};

export default UniswapProvider;
