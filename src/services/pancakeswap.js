import axios from 'axios';

const tokenDatabaseKey = 'tokenDatabaseKey13';

export const fetchTokenDetails = async contract => {
    const data = getTokenDatabase();
    let tokenData = data.find(token => token.contract === contract);

    if (tokenData) return tokenData;

    try {
        const result = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${contract}`);
        tokenData = result.data.data;
        tokenData.contract = contract;
        data.push(tokenData);
        updateTokenDatabase(data);
        return tokenData;
    } catch (err) {
        throw new Error('Failed to get token details');
    }
};

export const findTokenBySymbol = symbol => {};

export const findTokenByName = name => {};

export const findTokenByNameOrSymbol = searchKey => {};

export const findTokenByAddress = address => {};

export const getTokenDatabase = () => {
    return JSON.parse(localStorage.getItem(tokenDatabaseKey)) || [];
};

export const updateTokenDatabase = newDatabase => {
    localStorage.setItem(tokenDatabaseKey, JSON.stringify(newDatabase));
};
