const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Launch Presale", function () {

  let owner, account1, account2, account3, account4, account5, account6;
  let BUSD;
  let busd;
  let SeedToken;
  let seedToken;
  let SkinToken;
  let skinToken;
  let Seed;
  let seed;
  let Skin;
  let skin;
  let Land;
  let land;
  let Pack;
  let pack;

  it("All contracts should be deployed", async function () {
    [owner, account1, account2, account3, account4, account5, account6] = await ethers.getSigners();

    console.log('*******************Prepare BUSD************************');
    BUSD = await ethers.getContractFactory("BEP20Token");
    console.log("Deploying SeedToken...");
    busd = await BUSD.deploy();
    await busd.deployed();
    console.log("BUSD deployed to:", busd.address);

    console.log('*******************Start with NonNFT Items************************');
    SeedToken = await ethers.getContractFactory("NSeed");
    console.log("Deploying SeedToken...");
    seedToken = await upgrades.deployProxy(SeedToken, [], { initializer: 'initialize' });
    console.log("Deploying SeedTokenProxy...");
    await seedToken.deployed();
    console.log("Seed deployed to:", seedToken.address);

    SkinToken = await ethers.getContractFactory("NSkin");
    console.log("Deploying SkinToken...");
    skinToken = await upgrades.deployProxy(SkinToken, [], { initializer: 'initialize' });
    console.log("Deploying SkinToken Proxy...");
    await skinToken.deployed();
    console.log("Seed deployed to:", skinToken.address);

    console.log('*******************Start with Seed************************');

    Seed = await ethers.getContractFactory("Seed");
    console.log("Deploying Seed...");
    seed = await upgrades.deployProxy(Seed, [], { initializer: 'initialize' });
    console.log("Deploying Seed Proxy...");
    await seed.deployed();
    console.log("Seed deployed to:", seed.address);

    console.log('*******************Start with Skin************************');

    Skin = await ethers.getContractFactory("Skin");
    console.log("Deploying Skin...");
    skin = await upgrades.deployProxy(Skin, [], { initializer: 'initialize' });
    console.log("Deploying skin Proxy...");
    await skin.deployed();
    console.log("Skin deployed to:", skin.address);

    console.log('*******************Start with Land************************');

    Land = await ethers.getContractFactory("Land");
    console.log("Deploing Land...");
    land = await upgrades.deployProxy(Land, [], { initializer: 'initialize' });
    console.log("Deploying Land Proxy...");
    await land.deployed();
    console.log("Land deployed to:", land.address);

    console.log('*******************Start with Presale contract************************');

    Pack = await ethers.getContractFactory("Pack");
    console.log("Deploying Presale contract...");
    pack = await upgrades.deployProxy(Pack, [seedToken.address, skinToken.address, seed.address, skin.address, land.address, busd.address], { initializer: 'initialize' });
    console.log("Deploying Presale proxy...");
    await pack.deployed();
    console.log("Presale deployed to:", pack.address);
  });

  it("Set Address", async function() {
    console.log('*******************Set Minter for all NFTs************************');

    await seedToken.setMinter(pack.address);
    await skinToken.setMinter(pack.address);
    await seed.setMinter(pack.address);
    await skin.setMinter(pack.address);
    await land.setMinter(pack.address);

    console.log("\nMinter setting complete\n");
    console.log("*******************Deployed Addresses************************");
    console.log("BUSD: ", busd.address);
    console.log("NSeed: ", seedToken.address);
    console.log("NSkin: ", skinToken.address);
    console.log("Seed: ", seed.address);
    console.log("Skin: ", skin.address);
    console.log("Land: ", land.address);
    console.log("Presale: ", pack.address);
  })

  it("Send BUSD to each accounts", async function () {
    console.log("\nSend BUSD to each accounts\n");
 
    await busd.transfer(account1.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account1.address}`);
    await busd.transfer(account2.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account2.address}`);
    await busd.transfer(account3.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account3.address}`);
    await busd.transfer(account4.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account4.address}`);
    await busd.transfer(account5.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account5.address}`);
    await busd.transfer(account6.address, BigInt(10000 * 10 ** 18));
    console.log(`Sent ${10000}BUSD to ${account6.address}`);
  })

  it("Start Presale", async function () {
    console.log("\nLaunch Presale\n");
    await busd.connect(account1).approve(pack.address, BigInt(2000 * 10 ** 18));
    await pack.connect(account1).mint("", 5);
    console.log("Bought Beginner's Pack");
  })
});