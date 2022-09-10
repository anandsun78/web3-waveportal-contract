// Script to test the wave portal contract behaviour

const test = async () => {
  //deploy wave portal contract
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract addy:", waveContract.address);

  // get current contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // get current wave count
  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  // send two waves
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  // get contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // get total wave count
  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await test();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
