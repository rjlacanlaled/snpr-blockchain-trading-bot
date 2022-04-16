const abiDecoder = require('abi-decoder');
const express = require('express');
const abi = require('../snpr-blockchain-trading-bot/src/data/pancakeswap-router-v2-abi.json');
const Web3 = require('web3');
const ethers = require('ethers');

const defaultProvider = 'wss://speedy-nodes-nyc.moralis.io/f21c061f796d5011345dd3cd/bsc/mainnet/ws';
const defaultRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const app = express();

const Wallet = require('ethereumjs-wallet');
const EthUtil = require('ethereumjs-util');

const privateKeyBuffer = EthUtil.toBuffer('0x85923a93042c6682093e13ce456cd1dc78cdb7b2a0fe2696b5410a64dbb7d7c7');
const wallet = ethers.Wallet.fromPrivateKey(privateKeyBuffer);
const publicKey = wallet.getPublicKeyString();

console.log({publicKey});

const web3 = new Web3(defaultProvider);
abiDecoder.addABI(abi);

app.get('/', async (req, res) => {
    //runMemPoolListener();
});

const runMemPoolListener = () => {
    const listenToMempool = web3.eth
        .subscribe('pendingTransactions', () => {})
        .on('data', tx => {
            processTransaction(tx);
        }).on("error", err => {
            console.log(err);
            console.log("error");
        });
};

const processTransaction = async tx => {
    const decodedTx = await web3.eth.getTransaction(tx);

    if (decodedTx) {
        if ((decodedTx.to && decodedTx.to.toLowerCase()) === defaultRouter.toLowerCase()) {
            const transactionData = abiDecoder.decodeMethod(decodedTx.input);

            if (transactionData) {
                const paths = transactionData.params.filter(data => data.name === 'path').map(path => path.value)[0];
                if (!paths) return;

                const destination = paths[paths.length - 1];
                if (!web3.utils.isAddress(destination)) return;

                if (web3.utils.toChecksumAddress(destination) === web3.utils.toChecksumAddress('0x129385c4acd0075e45a0c9a5177bdfec9678a138')) {
                    console.log({ transactionData, decodedTx });
                }
            }
        }
    }
};

app.listen(3500);
