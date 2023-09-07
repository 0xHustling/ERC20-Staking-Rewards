// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC20 Staking Token
 * @dev This is an ERC20 compliant contract for staking.
 */
contract StakingToken is ERC20Burnable, ERC20Capped, Ownable {
    constructor(uint256 _maxSupply, string memory _name, string memory _symbol)
        ERC20Capped(_maxSupply)
        ERC20(_name, _symbol)
    {
        _mint(_msgSender(), _maxSupply);
    }

    function burn(uint256 amount) public override onlyOwner {
        super.burn(amount);
    }

    function burnFrom(address account, uint256 amount) public override onlyOwner {
        super.burnFrom(account, amount);
    }

    function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
        super._mint(account, amount);
    }
}
