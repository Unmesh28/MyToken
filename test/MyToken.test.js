const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
const { assert } = require("console");
const exp = require("constants");
const { setMaxListeners } = require("events");
const { isTypedArray } = require("util/types");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async(accounts) => {

    const [deployedAccount, recipient, anotherAccount] = accounts;

    it("All tokens should be in my account", async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        expect(await instance.balanceOf(deployedAccount)).to.be.a.bignumber.equal(totalSupply);
    });

    it("it is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployedAccount)).to.eventually.to.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployedAccount)).to.eventually.to.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It is not possible to send more tokens than total availble", async() => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployedAccount);
        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        expect(instance.balanceOf(deployedAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});