import { createContext, useContext, useState } from 'react';
import { local } from 'web3modal';
import usePersist from '../hooks/usePersist';

export const TradingBotContext = createContext();

const TradingBotContextProvider = ({ children }) => {
    const [sellContract, setSellContract] = usePersist('sellContract', '');
    const [sellAmount, setSellAmount] = usePersist('sellAmount');
    const [profitPercentage, setProfitPercentage] = useState();
    const [sellBalance, setSellBalance] = useState();
    const [buyTargetAmount, setBuyTargetAmount] = useState();

    const autoTrade = ({ children }) => {
        const token1 = JSON.parse(localStorage.getItem('token1Address'));
        if (!token1) return;
        const token2 = JSON.parse(localStorage.getItem('token2Address'));
        if (!token2) return;

        console.log(token1, token2);
    };

    return <TradingBotContext.Provider value={{ autoTrade }}>{children}</TradingBotContext.Provider>;
};

export default TradingBotContextProvider;
