const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
const { assert } = require("console");
const { setMaxListeners } = require("events");
const { isTypedArray } = require("util/types");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async(accounts) => {
    it("All tokens should be in my account", async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
    })
});