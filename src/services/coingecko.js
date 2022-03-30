import axios from 'axios';

export const fetchContractDetails = async (contract, id = 'binance-smart-chain') => {
    try {
        const tokenDetails = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/contract/${contract}`);
        return tokenDetails;
    } catch (err) {
        throw new Error('Unable to get token details');
    }
};


