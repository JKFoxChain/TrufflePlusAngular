pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
    Adoption adoption = Adoption(DeployedAddresses.Adoption());
    
    function testUserCanAdoptPet() public {
        uint returnedId = adoption.adopt(8);
        uint expected = 8;
        Assert.equal(returnedId, expected, "Adoption of pet Id is 8");
    }

    function testGetAdopterAddressByPetId() public {
        address expected = this;
        address adopter = adoption.adopters(8);
        Assert.equal(adopter, expected, "Owner of pet Id 8 should be recorded.");
    }

    function testGetAdoperAddressByPetIdArray() public {
        address expected = this;
        address[16] memory adopters = adoption.getAopters();
        Assert.equal(adopters[8], expected, "Owner of Id should be 8");
    } 
}