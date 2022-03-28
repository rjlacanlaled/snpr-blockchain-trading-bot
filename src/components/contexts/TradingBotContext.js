import { createContext, useContext, useEffect, useState } from 'react';
import { local } from 'web3modal';
import useBlockchainNetwork from '../hooks/useBlockchainNetwork';
import useLocalStorageDatabase from '../hooks/useLocalStorageDatabase';
import usePersist from '../hooks/usePersist';
import useUniswap from '../hooks/useUniswap';

export const TradingBotContext = createContext();

const TradingBotContextProvider = ({ children }) => {
    const { swapExactTokensForTokensSupportingFeeOnTransferTokens, getTradeDetails, getFormmatedTradeInputs } =
        useUniswap();
    const { getTokenBalance, getFormattedTokenBalance, getTokenSymbol } = useBlockchainNetwork();
    const [sellContract, setSellContract] = usePersist('sellContract', '');
    const [buyContract, setBuyContract] = usePersist('buyContract', '');
    const [sellAmount, setSellAmount] = usePersist('sellAmount', '');
    const [token1Balance, setToken1Balance] = usePersist('token1balance', '');
    const [token2Balance, setToken2Balance] = usePersist('token2balance', '');
    const [profitPercentage, setProfitPercentage] = useState();
    const [buyTargetAmount, setBuyTargetAmount] = useState();
    const [tradeHistory, setTradeHistory] = useLocalStorageDatabase('botTradeHistory');
    const [bot, setBot] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isCalculatingProfit, setIsCalculatingProfit] = useState(false);
    const [isCheckingBalance, setIsCheckingBalance] = useState(false);
    const [isTransacting, setIsTransacting] = useState(false);
    const [isFirstBuy, setIsFirstBuy] = useState(true);
    const [slippage, setSlippage] = useState(0.5);

    useEffect(() => {
        if (isRunning) {
            if (bot) return;

            const tradeBot = setInterval(() => {
                if (isCalculatingProfit) return;
                setIsCalculatingProfit(true);
                console.log('Looking for profit...!');
            }, 30000);

            console.log('Looking for  profit...');
            setIsCalculatingProfit(true);

            setBot(tradeBot);
        } else {
            if (!bot) return;
            console.log('Stopping bot...');
            clearInterval(bot);
        }
    }, [isRunning, bot, isTransacting]);

    useEffect(() => {
        if (!isRunning) return;
        const calculateProfit = async () => {
            if (isCalculatingProfit) {
                // DO NOT CHECK IF CURRENTLY TRANSACTING
                if (isTransacting) return console.log('Currently transacting, please wait...');

                console.log('Initiating transaction...');

                try {
                    // CHECK IF TRANSACTION IS WITHIN PROFIT MARGIN
                    if (isFirstBuy) {
                        console.log('This is the first transaction, proceeding immediately with the transaction...');
                        const tx = await transact();
                    } else {
                        console.log('Calculating profit....');
                        const { tokenInDecimal, tokenOutDecimal, parsedAmountIn } = await getFormmatedTradeInputs(
                            sellAmount,
                            sellContract,
                            buyContract
                        );
                        // console.log(tokenInDecimal, tokenOutDecimal, parsedAmountIn);
                        // (amountIn, tokenIn, tokenInDecimal, tokenOut, tokenOutDecimal, slippage
                        const [res, details] = await getTradeDetails(
                            parsedAmountIn,
                            sellContract,
                            tokenInDecimal,
                            buyContract,
                            tokenOutDecimal,
                            slippage
                        );

                        if (res) {
                            console.log('Profit details...');
                            // console.log(transactionDetails);

                            const { amountOutMin } = details;

                            const prevTrade = tradeHistory[tradeHistory.length - 1];
                            console.log(`prev amount: ${prevTrade.amountIn} ${prevTrade.amountInSymbol}`);
                            console.log(`current amount out: ${amountOutMin} ${prevTrade.amountInSymbol}`);
                            const difference = parseFloat(amountOutMin) - parseFloat(prevTrade.amountIn);
                            console.log(`current profit: ${difference} ${prevTrade.amountInSymbol}`);

                            const percentage = parseFloat(amountOutMin)/parseFloat(prevTrade.amountIn)*100;
                            console.log(`percentage profit is ${percentage} percentage`);
                            const targetProfit = 100 + parseFloat(profitPercentage);
                            const differencePercentage = percentage - targetProfit;
                            console.log({differencePercentage});

                            if (differencePercentage >= 0) {
                                console.log('Proceeding to trade...');
                            } else {
                                console.log('Better luck later!');
                            }
                        } else {
                            console.log('Error fetching trade details, retrying...');
                        }

                        setIsCalculatingProfit(false);
                    }
                } catch (err) {
                    setIsCalculatingProfit(false);
                    console.log(err.toString());
                }
            }
        };

        calculateProfit();
    }, [isCalculatingProfit, isTransacting, isFirstBuy, sellAmount, sellContract, buyContract]);

    useEffect(() => {
        if (isCheckingBalance) {
            console.log('Currently checking balance...');
            // const sellBalance = await getTokenBalance(sellContract);
            // const buyBalance = await getTokenBalance(buyContract);

            // if (sellBalance > buyBalance) return setIsTransacting(false);

            // const formattedSellBalance = await getFormattedTokenBalance(sellContract);
            // const formattedBuyBalance = await getFormattedTokenBalance(buyContract);

            // let profit;

            // if (isFirstBuy) {
            //     profit = 0;
            // } else {
            //     profit =
            //         parseFloat(formattedBuyBalance) -
            //         parseFloat(tradeHistory[tradeHistory.length - 1].formattedSellBalance);
            // }

            // setTradeHistory({
            //     formattedSellBalance,
            //     sellContract,
            //     sellSymbol: await getTokenSymbol(sellContract),
            //     buyTargetAmount,
            //     totalBuyAmount: formattedBuyBalance,
            //     profit,
            // });

            setIsTransacting(false);
            setIsCheckingBalance(false);
            console.log('Done checking balance...');
        }
    }, [isCheckingBalance]);

    const transact = async () => {
        if (isFirstBuy) {
            try {
                console.log('Doing first transaction...');
                setTradeHistory({
                    amountIn: '51661.9394',
                    amountInSymbol: 'MTK',
                    amountOut: '230',
                    amountOutSymbol: 'BUSD',
                    profit: '0',
                    profitSymbol: 'BUSD',
                });

                console.log('Successfully saved the first transaction!');

                setIsFirstBuy(false);
                // amountIn,
                // tokenIn,
                // tokenOut,
                // slippage,

                // const tx = await swapExactTokensForTokensSupportingFeeOnTransferTokens(
                //     sellAmount,
                //     sellContract,
                //     buyContract,
                //     slippage
                // );

                setIsTransacting(true);

                console.log('Checking in 10 seconds if transaction was successful..');
                setTimeout(() => setIsCheckingBalance(true), 10000);
            } catch (ex) {}
        }
    };

    const autoTrade = async slippage => {
        console.log(slippage);
        setSlippage(slippage);
        const token1 = JSON.parse(localStorage.getItem('token1address'));
        const token2 = JSON.parse(localStorage.getItem('token2address'));
        const profit = JSON.parse(localStorage.getItem('profitPercentage'));
        setProfitPercentage(parseFloat(profit));

        if (!token1 || !token2 || !profit) return;

        const token1Balance = await getTokenBalance(token1);
        const token2Balance = await getTokenBalance(token2);

        setToken1Balance(token1Balance);
        setToken2Balance(token2Balance);

        const formattedToken1Balance = await getFormattedTokenBalance(token1);
        const formattedToken2Balance = await getFormattedTokenBalance(token2);

        setSellAmount(
            parseFloat(formattedToken1Balance) > parseFloat(formattedToken2Balance)
                ? formattedToken1Balance
                : formattedToken2Balance
        );

        if (parseFloat(formattedToken1Balance)  > parseFloat(formattedToken2Balance)) {
            setSellContract(token1);
            setBuyContract(token2);
        } else {
            setSellContract(token2);
            setBuyContract(token1);
        }

        setIsRunning(true);

        // setTradeHistory({
        //     amountIn: '1000',
        //     amountInSymbol: 'BUSD',
        //     amountOut: '10230',
        //     amountOutSymbol: 'MTK',
        //     profit: '1000',
        //     profitSymbol: 'MTK',
        // });

        console.log(tradeHistory);
    };

    const stopBot = () => {
        setIsRunning(false);
    };

    return <TradingBotContext.Provider value={{ autoTrade, stopBot, bot, tradeHistory }}>{children}</TradingBotContext.Provider>;
};

export default TradingBotContextProvider;
