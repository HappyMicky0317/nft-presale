const ethers = require("ethers");

let ABI = [
    "constructor(address logic, bytes memory data)"
];

let iface = new ethers.utils.Interface(ABI);
let encoded = iface.encodeFunctionData("constructor", ["0xc7aDe2231e044Ff16f58348948e7CaF1b2467BF6", ethers.utils.parseEther("1.0")]);

console.log(encoded)