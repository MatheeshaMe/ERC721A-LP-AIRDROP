//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OFFChainAD is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;

    string private  baseTokenUri;

    // Signature tracker
    mapping(bytes => bool) public signatureUsed;

    constructor() ERC721("NFT Allowlist Demo", "NAD") {
        console.log("Contract has been deployed!");
    }

    // Allowlist addresses
    function recoverSigner(bytes32 hash, bytes memory signature)
        public
        pure
        returns (address)
    {
        bytes32 messageDigest = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
        return ECDSA.recover(messageDigest, signature);
    }

    // Airdrop mint
    function claimAirdrop(
        uint256 _count,
        bytes32 hash,
        bytes memory signature
    ) public {
        require(
            recoverSigner(hash, signature) == owner(),
            "Address is not allowlisted"
        );
        require(!signatureUsed[signature], "Signature has already been used.");

        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }

        signatureUsed[signature] = true;
    }

    function _mintSingleNFT() private {
        uint256 newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

        function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenUri;
    }

    //return uri for certain token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        //string memory baseURI = _baseURI();
        return bytes(baseTokenUri).length > 0 ? string(abi.encodePacked(baseTokenUri, tokenId.toString(), ".json")) : "";
    }

    function setTokenUri(string memory _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }
}
