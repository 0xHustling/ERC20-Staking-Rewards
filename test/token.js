const { expect } = require("chai");
const { waffle, ethers, upgrades, network } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { loadFixture } = waffle;

const IMPERSONATED_SIGNER_ADDRESS =
  "0x0000000000000000000000000000000000000000";
const MAX_SUPPLY = "1000000000000000000000000000";
const TOKEN_NAME = "Staking";
const TOKEN_SYMBOL = "STAKE";

describe("ERC20 Token", () => {
  const deployedContracts = async () => {
    [deployer] = await ethers.getSigners();
    const StakingToken = await hre.ethers.getContractFactory(
      "StakingToken",
      deployer
    );
    const stakingToken = await StakingToken.deploy(
      MAX_SUPPLY,
      TOKEN_NAME,
      TOKEN_SYMBOL
    );

    await stakingToken.deployed();

    await helpers.impersonateAccount(IMPERSONATED_SIGNER_ADDRESS);
    const impersonatedSigner = await ethers.getSigner(
      IMPERSONATED_SIGNER_ADDRESS
    );

    return {
      stakingToken,
      impersonatedSigner,
      deployer,
    };
  };

  it("should successfully deploy Staking token with correct configuration", async () => {
    const { stakingToken } = await loadFixture(deployedContracts);

    const tokenName = await stakingToken.name();
    const tokenSymbol = await stakingToken.symbol();

    expect(tokenName).to.equal(TOKEN_NAME);
    expect(tokenSymbol).to.equal(TOKEN_SYMBOL);
  });
});
