import { useContext } from 'react';
import { BlockchainNetworkContext } from '../contexts/BlockchainNetworkContext';

const useBlockchainNetwork = () => {
    return useContext(BlockchainNetworkContext);
}

export default useBlockchainNetwork;