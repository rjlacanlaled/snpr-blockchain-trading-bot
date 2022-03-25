import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const fetchValue = (network, address) => {
    let result;
    try {
        result = await axios.get(network.getFetcherUrl(address));
    } catch (error) {
        return [-1, error];
    }

    return [1, result];
};

const useTokenValue = (network, tokenAddress) => {
    const [value, setValue] = useState(() => fetchValue(network, tokenAddress));

    return [value, setValue];
};
