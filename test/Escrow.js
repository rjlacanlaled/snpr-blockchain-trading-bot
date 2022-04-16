const { expect } = require('chai');

describe('Escrow contract', () => {
    let owner;
    let recipient;
    let Escrow;
    let escrowContract;

    beforeEach(async () => {
        [owner, recipient] = await ethers.getSigners();

        Escrow = await ethers.getContractFactory('Escrow');
        escrowContract = await Escrow.deploy(recipient.address, 150);
    });

    describe('Deployment', () => {

        it('Should assign msg.sender to depositor', async () => {
            expect(await escrowContract.depositor()).to.equal(owner.address);
        });

        it('Should assign recipient to the intended address', async () => {
            expect(await escrowContract.recipient()).to.equal(recipient.address);
        });

        it('Should have zero funds', async () => {
            expect(await escrowContract.funds()).to.equal(0);
        });
    });

    describe('Transactions', () => {
        it('Should not allow non-depositor to deposit', async () => {
            //expect(await escrowContract.deposit())
        })
    });
});
