import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {

  const [owner, address1, address2] = await hre.ethers.getSigners();

  // Define a list of allowlisted wallets
  const allowlistedAddresses = [
    address1.address,
    address2.address,
  ];

  // Select an allowlisted address to mint NFT
  const selectedAddress = address1.address;

  // Define wallet that will be used to sign messages
  const walletAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'; // owner.address
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const signer = new ethers.Wallet(privateKey);
  console.log("Wallet used to sign messages: ", signer.address, "\n");

  let messageHash, signature;

  // Check if selected address is in allowlist
  // If yes, sign the wallet's address
  if (allowlistedAddresses.includes(selectedAddress)) {
    console.log("Address is allowlisted! Minting should be possible.");

    // Compute message hash
    messageHash = ethers.utils.id(selectedAddress);
    console.log("Message Hash: ", messageHash);

    // Sign the message hash
    let messageBytes = ethers.utils.arrayify(messageHash);
    signature = await signer.signMessage(messageBytes);
    console.log("Signature: ", signature, "\n");
  }

  const factory = await hre.ethers.getContractFactory("NFTAllowlist");
  const contract = await factory.deploy();

  await contract.deployed();
  console.log("Contract deployed to: ", contract.address);
  console.log("Contract deployed by (Owner/Signing Wallet): ", owner.address, "\n");

  const recover = await contract.recoverSigner(messageHash, signature);
  console.log("Message was signed by: ", recover.toString());

  let txn;
  txn = await contract.connect(address1).claimAirdrop(2, messageHash, signature);
  await txn.wait();
  console.log("NFTs minted successfully!");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });