const pancakeswapAbi = require('../../src/data/pancakeswap-router-v2-abi.json');
const Web3 = require('web3');


const defaultGasPrice = ethers.utils.parseUnits('5', 'gwei');
const defaultGas = ethers.utils.parseUnits('500000', 'wei');

const defaultProvider = 'wss://young-proud-lake.bsc.quiknode.pro/2b606bf9c9bf278fee8c4aaa347f660237e52e06/';
const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const MTK = '0x129385c4acd0075e45a0c9a5177bdfec9678a138';



const listenToMempoolForUniswapTransactions =  async () => {

}