const { ethers, upgrades } = require("hardhat");

async function main() {
    console.log('\n*******************Prepare BUSD***********************************');
    const BUSD = await ethers.getContractFactory("BEP20Token");
    console.log("Deploying test BUSDToken...");
    const busd = await BUSD.deploy();
    await busd.deployed();
    console.log("BUSD deployed to:", busd.address);

    console.log('\n*******************Start with NonNFT Items************************');
    const SeedToken = await ethers.getContractFactory("NSeed");
    console.log("Deploying SeedToken...");
    const seedToken = await upgrades.deployProxy(SeedToken, [], { initializer: 'initialize' });
    console.log("Deploying SeedTokenProxy...");
    await seedToken.deployed();
    console.log("Seed deployed to:", seedToken.address);
    console.log("\n");
    const SkinToken = await ethers.getContractFactory("NSkin");
    console.log("Deploying SkinToken...");
    const skinToken = await upgrades.deployProxy(SkinToken, [], { initializer: 'initialize' });
    console.log("Deploying SkinToken Proxy...");
    await skinToken.deployed();
    console.log("Seed deployed to:", skinToken.address);

    console.log('\n*******************Start with Seed********************************');

    const Seed = await ethers.getContractFactory("Seed");
    console.log("Deploying Seed...");
    const seed = await upgrades.deployProxy(Seed, [], { initializer: 'initialize' });
    console.log("Deploying Seed Proxy...");
    await seed.deployed();
    console.log("Seed deployed to:", seed.address);

    console.log('\n*******************Start with Skin********************************');

    const Skin = await ethers.getContractFactory("Skin");
    console.log("Deploying Skin...");
    const skin = await upgrades.deployProxy(Skin, [], { initializer: 'initialize' });
    console.log("Deploying skin Proxy...");
    await skin.deployed();
    console.log("Skin deployed to:", skin.address);

    console.log('\n*******************Start with Land********************************');

    const Land = await ethers.getContractFactory("Land");
    console.log("Deploing Land...");
    const land = await upgrades.deployProxy(Land, [], { initializer: 'initialize' });
    console.log("Deploying Land Proxy...");
    await land.deployed();
    console.log("Land deployed to:", land.address);

    console.log('\n*******************Start with Presale contract********************');

    const Pack = await ethers.getContractFactory("Pack");
    console.log("Deploying Presale contract...");
    const pack = await upgrades.deployProxy(Pack, [seedToken.address, skinToken.address, seed.address, skin.address, land.address, busd.address], { initializer: 'initialize' });
    console.log("Deploying Presale proxy...");
    await pack.deployed();
    console.log("Presale deployed to:", pack.address);

    console.log('\n*******************Set Minter for all NFTs***************************');
    
    await seedToken.setMinter(pack.address);
    await skinToken.setMinter(pack.address);
    await seed.setMinter(pack.address);
    await skin.setMinter(pack.address);
    await land.setMinter(pack.address);

    console.log("\nMinter setting complete\n");
    console.log("\n*******************!!!!!!Don't forget this addresses!!!!!***********\n");
    console.log("BUSD: ", busd.address);
    console.log("NSeed: ", seedToken.address);
    console.log("NSkin: ", skinToken.address);
    console.log("Seed: ", seed.address);
    console.log("Skin: ", skin.address);
    console.log("Land: ", land.address);
    console.log("Presale: ", pack.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});