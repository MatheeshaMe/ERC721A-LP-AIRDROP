// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTMINT3D is ERC721A, Ownable {
    using Strings for uint256;

    constructor() ERC721A("BEEBOY", "Bee3D") {}

    mapping(address => uint256) public totalPublicMint3d;
    string private baseTokenUri3d;
    string public placeholderTokenUri3d;
    bool public isRevealed3d;

    function mint3d(uint256 _quantity) internal {
        totalPublicMint3d[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenUri3d;
    }

    //return uri for certain token
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            bytes(baseTokenUri3d).length > 0
                ? string(
                    abi.encodePacked(
                        baseTokenUri3d,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function setTokenUri(string memory _baseTokenUri) external onlyOwner {
        baseTokenUri3d = _baseTokenUri;
    }

    function setPlaceHolderUri(string memory _placeholderTokenUri)
        external
        onlyOwner
    {
        placeholderTokenUri3d = _placeholderTokenUri;
    }

    function toggleReveal() external onlyOwner {
        isRevealed3d = !isRevealed3d;
    }
}
