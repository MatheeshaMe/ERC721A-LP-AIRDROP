import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const addresses = [
  "0x69D26e21F460E8ACFD33d176BF55FF5160dFfDF5",
  "0xC8896b750EdF754412224DB6b228787db6D09193"
];
const leaves = addresses.map((x) => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, {
  sortPairs: true,
});
const buf2hex = (x: Buffer) => ("0x" + x.toString("hex")) as any;
const leaf = addresses[0]; /** @Dev The address of the user */
console.log("merkle root ===> ", buf2hex(tree.getRoot()));  /**@Dev Merkle root*/
console.log("address ===> ", leaf);
const passLeaf = keccak256(leaf);
console.log(passLeaf)
console.log(
  "merkle proof ===>",
  tree.getProof(passLeaf).map((x) => buf2hex(x.data)) /** Merkle proof generates with the user address */
);
