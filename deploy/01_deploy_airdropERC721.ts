import hre from "hardhat"

async function main() {
    const NFTCONTRACT = await hre.ethers.getContractFactory("NFTCONTRACT")
    const nftContract = await NFTCONTRACT.deploy()

    await nftContract.deployed()

    console.log("NFT contract deployed to",nftContract.address)
}

/**
  @type
   */

  /**  */
  /** @D */
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })