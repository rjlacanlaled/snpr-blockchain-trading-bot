import { useContext } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';

const useBlockchainNetwork = () => {
    return useContext(BlockchainContext);
}

export default useBlockchainNetwork;