import { useEffect } from 'react';
import { useState } from 'react';
import useBlockchainNetwork from './useBlockchainNetwork';
import axios from 'axios';

const fetchValue = (network, address) => {
    axios.get()
}

const useTokenValue = tokenAddress => {
    const blockchain = useBlockchainNetwork();
    const [value, setValue] = useState(() => fetchValue(blockchain.network, tokenAddress));

    return [value, setValue];
};
