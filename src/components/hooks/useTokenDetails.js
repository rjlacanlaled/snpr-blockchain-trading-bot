import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const fetchDetails = (network, address) => {
    console.log(network, address);
    let result;
    try {
        result = axios.get(network.getFetcherUrl(address));
    } catch (error) {
        return [-1, error];
    }

    return [1, result];
};

const useTokenDetails = (network, tokenAddress) => {
    const [value, setValue] = useState(() => fetchDetails(network, tokenAddress));

    useEffect(() => {
        setValue(fetchDetails(tokenAddress, network));
    }, [tokenAddress, network]);

    return [value, setValue];
};

export default useTokenDetails;
