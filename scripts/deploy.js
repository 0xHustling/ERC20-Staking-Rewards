const hre = require("hardhat");

async function main() {
  console.log("Starting deploy Staking token...");

  const StakingToken = await hre.ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy(
    process.env.MAX_SUPPLY,
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL
  );

  await stakingToken.deployed();

  console.log(
    `Staking token deployed to: https://goerli.etherscan.io/address/${stakingToken.address}`
  );

  console.log("Starting deploy Staking Rewards...");

  const StakingRewards = await hre.ethers.getContractFactory("StakingRewards");
  const stakingRewards = await StakingRewards.deploy(
    stakingToken.address,
    stakingToken.address,
    process.env.REWARDS_DURATION,
    process.env.LOCK_PERIOD
  );

  await stakingRewards.deployed();

  console.log(
    `Staking rewards deployed to: https://goerli.etherscan.io/address/${stakingRewards.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
