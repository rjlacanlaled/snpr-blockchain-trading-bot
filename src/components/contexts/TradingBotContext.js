import { createContext, useContext, useEffect, useState } from 'react';
import { local } from 'web3modal';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import useLocalStorageDatabase from '../hooks/useLocalStorageDatabase';
import usePersist from '../hooks/usePersist';
import useUniswap from '../hooks/useUniswap';
import { ethers } from 'ethers';

export const TradingBotContext = createContext();

const TradingBotContextProvider = ({ children }) => {
    const {
        swapExactTokensForTokensSupportingFeeOnTransferTokens,
        swapExactTokensForTokensSupportingFeeOnTransferWithAmountOutMin,
        getTradeDetails,
        getFormmatedTradeInputs,
    } = useUniswap();
    const { getTokenBalance, getFormattedTokenBalance, getTokenSymbol, getTokenDecimal } = useBlockchainNetwork();

    const [token1, setToken1] = useState();
    const [token2, setToken2] = useState();
    const [slippage, setSlippage] = useState();

    const [token1Balance, setToken1Balance] = useState();
    const [token2Balance, setToken2Balance] = useState();
    const [token1FormattedBalance, setToken1FormattedBalance] = useState();
    const [token2FormattedBalance, setToken2FormattedBalance] = useState();

    const [previousTradeAmount, setPreviousTradeAmount] = usePersist('previousTradeAmount');
    const [previousTokenAddress, setPreviousTokenAddress] = usePersist('previousTokenAddress');

    const [profit, setProfit] = useState(5);
    const [amountOutMin, setAmountOutMin] = useState(0);

    // TRIGGER STATES
    const [calculatingAmountOutMin, setCalculatingAmountOutMin] = useState(false);
    const [isSellingToken1, setIsSellingToken1] = useState(true);
    const [isBotRunning, setIsBotRunning] = useState(false);
    const [isCalculatingTransaction, setIsCalculatingTransaction] = useState(false);

    const initAutoTrade = async (token1, token2, slippage, previousToken, previousAmount, profitRate) => {
        setToken1(token1);
        setToken2(token2);
        setSlippage(slippage);
        setPreviousTokenAddress(previousToken);
        setPreviousTradeAmount(previousAmount);
        setProfit(profitRate);
        setIsBotRunning(true);
    };

    useEffect(() => {
        const setBalances = async () => {
            setToken1Balance(await getTokenBalance(token1));
            setToken2Balance(await getTokenBalance(token2));
            setToken1FormattedBalance(await getFormattedTokenBalance(token1));
            setToken2FormattedBalance(await getFormattedTokenBalance(token2));
        };

        if (!isBotRunning) return;
        if (!token1 || !token2) return;
        setIsSellingToken1(!(token1 === previousTokenAddress));
        setBalances();
    }, [token1, token2, isBotRunning]);

    useEffect(() => {
        const calculateExpectedOutput = async () => {
            const expectedAmountOutMin = parseFloat(previousTradeAmount) * (profit / 100.0 + 1);
            const tokenDecimal = await getTokenDecimal(isSellingToken1 ? token2 : token1);
            const parsedAmountOutMin = ethers.utils.parseUnits(expectedAmountOutMin.toString(), tokenDecimal);

            setAmountOutMin(parsedAmountOutMin);
            setCalculatingAmountOutMin(false);
        };

        if (calculatingAmountOutMin) return;
        if (!isBotRunning) return;
        if (!previousTradeAmount) return;
        if (!token2FormattedBalance || !token1FormattedBalance || !profit) return;

        calculateExpectedOutput();
        setCalculatingAmountOutMin(true);
    }, [token1FormattedBalance, token2FormattedBalance, profit, isSellingToken1, previousTradeAmount, isBotRunning]);

    useEffect(() => {
        const attemptToTrade = async () => {
            const amountIn = isSellingToken1 ? token1Balance : token2Balance;
            const tokenIn = isSellingToken1 ? token1 : token2;
            const tokenOut = isSellingToken1 ? token2 : token1;

            const [status, res] = await swapExactTokensForTokensSupportingFeeOnTransferWithAmountOutMin(
                amountIn,
                tokenIn,
                tokenOut,
                slippage,
                amountOutMin
            );

            if (status == 1) {
                console.log(res);
                alert('success');

                // do something to loop
            } else {
                console.log('re-doing this shit')
                console.log(res);

                setIsCalculatingTransaction(false);
            }
        };

        if (!isBotRunning) return;
        if (isCalculatingTransaction) return;
        if (calculatingAmountOutMin) return;
        if (!token1Balance || !token2Balance || !token1 || !token2) return;

        setIsCalculatingTransaction(true);
        attemptToTrade();
    }, [calculatingAmountOutMin, isBotRunning, isCalculatingTransaction]);

    return <TradingBotContext.Provider value={{ initAutoTrade, isBotRunning }}>{children}</TradingBotContext.Provider>;
};

export default TradingBotContextProvider;
