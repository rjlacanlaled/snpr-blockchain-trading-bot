const { ethers } = require('hardhat');

const main = async () => {
    const Escrow = await ethers.getContractFactory('Escrow');
    const escrowContract = await Escrow.deploy('0xb43048eAe47Ee3eCcAd3541F577a2f205c6B6BD0', 150);
    await escrowContract.deployed();
    console.log('Successfully deployed: ', escrowContract.address);
    console.log('Funds', await escrowContract.funds());
    console.log('Depositor', await escrowContract.depositor());
    console.log('First', '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');
};

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
