import { createContext, useContext, useEffect, useState } from 'react';
import { local } from 'web3modal';
import useBlockchainNetwork from '../hooks/useBlockchain';
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
    const [token1Decimal, setToken1Decimal] = useState();
    const [token2Decimal, setToken2Decimal] = useState();

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
    const [checkingIsTransactionSuccess, setCheckingIsTransactionSuccess] = useState(false);

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
            setToken1Decimal(await getTokenDecimal(token1));
            setToken2Decimal(await getTokenDecimal(token2));
        };

        if (!isBotRunning) return;
        if (!token1 || !token2) return;
        console.log('===========BOT IS RUNNING... CALCULATING BALANCES=========');
        setIsSellingToken1(!(token1 === previousTokenAddress));
        setBalances();
    }, [token1, token2, isBotRunning]);

    useEffect(() => {
        const calculateExpectedOutput = async () => {
            console.log('===========CALCULATING EXPECTED AMOUNT OUT===============');

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
            console.log('============ATTEMPTING TO TRADE=============');
            const amountIn = isSellingToken1 ? token1Balance : token2Balance;
            const tokenIn = isSellingToken1 ? token1 : token2;
            const tokenOut = isSellingToken1 ? token2 : token1;
            const tokenInDecimal = isSellingToken1 ? token1Decimal : token2Decimal;
            const tokenOutDecimal = isSellingToken1 ? token2Decimal : token1Decimal;

            try {
                const [status, res] = await swapExactTokensForTokensSupportingFeeOnTransferWithAmountOutMin(
                    amountIn,
                    tokenIn,
                    tokenOut,
                    slippage,
                    amountOutMin,
                    tokenInDecimal,
                    tokenOutDecimal
                );

                if (status == 1) {
                    console.log('==========TRANSACTION SENT TO THE BLOCKCHAIN!==========');
                    console.log(res);
                    setCheckingIsTransactionSuccess(true);
                } else {
                    console.log(res);
                    console.log('==========DID NOT REACH THE PROFIT THRESHOD=============');
                    console.log('=============END ATTEMPT==============');

                    setIsCalculatingTransaction(false);
                }
            } catch (err) {
                console.log('==========ATTEMPT FAIL=============');
                console.log('===========ENCOUNTERED AN ERROR IN TRANSACTION ATTEMPT============');
                setIsCalculatingTransaction(false);
            }
        };

        if (!isBotRunning) return;
        if (checkingIsTransactionSuccess) return;
        if (!token1Decimal || !token2Decimal) return;
        if (isCalculatingTransaction) return;
        if (calculatingAmountOutMin) return;
        if (!token1Balance || !token2Balance || !token1 || !token2) return;

        try {
            setIsCalculatingTransaction(true);
            attemptToTrade();
        } catch (err) {
            setIsCalculatingTransaction(false);
        }
    }, [
        calculatingAmountOutMin,
        isBotRunning,
        isCalculatingTransaction,
        token1Decimal,
        token2Decimal,
        checkingIsTransactionSuccess,
    ]);

    useEffect(() => {
        const recalculateBalances = async () => {
            console.log('=============RECALCULATING BALANCES==============');
            const balance1 = await getTokenBalance(token1);
            const balance2 = await getTokenBalance(token2);

            const formattedBalance1 = await getFormattedTokenBalance(token1);
            const formattedBalance2 = await getFormattedTokenBalance(token2);

            const success = isSellingToken1
                ? parseFloat(formattedBalance2) > parseFloat(formattedBalance1)
                : parseFloat(formattedBalance1) > parseFloat(formattedBalance2);

            setCheckingIsTransactionSuccess(false);

            if (success) {
                console.log('=======TRANSACTION SUCCESS!!==========');
                setPreviousTradeAmount(isSellingToken1 ? formattedBalance1 : formattedBalance2);
                setPreviousTokenAddress(isSellingToken1 ? token1 : token2);

                setIsSellingToken1(!isSellingToken1);
                setToken1Balance(balance1);
                setToken2Balance(balance2);
                setToken1FormattedBalance(formattedBalance1);
                setToken2FormattedBalance(formattedBalance2);
            }

            setIsCalculatingTransaction(false);
        };

        if (!checkingIsTransactionSuccess) return;

        recalculateBalances();
    }, [checkingIsTransactionSuccess, isSellingToken1]);

    return <TradingBotContext.Provider value={{ initAutoTrade, isBotRunning }}>{children}</TradingBotContext.Provider>;
};

export default TradingBotContextProvider;
