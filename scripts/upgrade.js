const {ethers, upgrades} = require("hardhat");

async function main() {
    const Game = await ethers.getContractFactory('Game');
    console.log("Upgrading Seed...");
    await upgrades.upgradeProxy('0x81B237ad19727f5F5FE63342BF499F393107c466', Game);
    console.log("Seed Upgraded.");
}

main();