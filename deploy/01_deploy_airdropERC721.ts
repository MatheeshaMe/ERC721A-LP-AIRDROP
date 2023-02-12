import hre from "hardhat"

async function main() {
    const NFTCONTRACT = await hre.ethers.getContractFactory("NFTCONTRACT")
    const nftContract = await NFTCONTRACT.deploy()
    await nftContract.deployed()
    console.log("NFT contract deployed to",nftContract.address)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  //https://goerli.etherscan.io/address/0x051c1060c23742c3c684C873035a962aF8F8781A#code