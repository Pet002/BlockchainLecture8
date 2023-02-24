// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
pragma experimental ABIEncoderV2;

contract ProofOfCharacter {
    mapping(bytes32 => bool) private listCharacter;

    struct Owner {
        string owner;
        string character;
        string time;
    }

    Owner[] owners;

    // ----- event -----
    event NameAdded(
        address from,
        string text,
        bytes32 hash,
        string time,
        string owner
    );

    event purchaseError(address from, string text, string reason);

    function recordProof(bytes32 proof) private {
        listCharacter[proof] = true;
    }

    function purchase(
        string memory character,
        string memory owner,
        string memory time
    ) public payable {
        // Tanjiro Kamado  0.003
        if (keccak256(bytes("Tanjiro Kamado")) == keccak256(bytes(character))) {
            if (msg.value != 0.003 ether) {
                //---fire the event---
                emit purchaseError(
                    msg.sender,
                    character,
                    "Incorrect amout of Ether. You should pay 0.003 ether"
                );
                //---refund back to the sender---
                payable(msg.sender).transfer(msg.value);
                //---exit the function---
                return;
            }
        }
        // Zenitsu Agatsuma   0.002
        else if (
            keccak256(bytes("Zenitsu Agatsuma")) == keccak256(bytes(character))
        ) {
            if (msg.value != 0.002 ether) {
                //---fire the event---
                emit purchaseError(
                    msg.sender,
                    character,
                    "Incorrect amout of Ether. You should pay 0.002 ether"
                );
                //---refund back to the sender---
                payable(msg.sender).transfer(msg.value);
                //---exit the function---
                return;
            }
        }
        // Inosuke Hashibira   0.002
        else if (
            keccak256(bytes("Inosuke Hashibira")) == keccak256(bytes(character))
        ) {
            if (msg.value != 0.002 ether) {
                //---fire the event---
                emit purchaseError(
                    msg.sender,
                    character,
                    "Incorrect amout of Ether. You should pay 0.002 ether"
                );
                //---refund back to the sender---
                payable(msg.sender).transfer(msg.value);
                //---exit the function---
                return;
            }
        }
        // Muzan Kibutsuji   0.01
        else if (
            keccak256(bytes("Muzan Kibutsuji")) == keccak256(bytes(character))
        ) {
            if (msg.value != 0.01 ether) {
                //---fire the event---
                emit purchaseError(
                    msg.sender,
                    character,
                    "Incorrect amout of Ether. You should pay 0.01 ether"
                );
                //---refund back to the sender---
                payable(msg.sender).transfer(msg.value);
                //---exit the function---
                return;
            }
        }
        // Nezuko Kamado  0.005
        else if (
            keccak256(bytes("Nezuko Kamado")) == keccak256(bytes(character))
        ) {
            if (msg.value != 0.005 ether) {
                //---fire the event---
                emit purchaseError(
                    msg.sender,
                    character,
                    "Incorrect amout of Ether. You should pay 0.005 ether"
                );
                //---refund back to the sender---
                payable(msg.sender).transfer(msg.value);
                //---exit the function---
                return;
            }
        }else{
        emit purchaseError(msg.sender, character, "Not Found Character");
        payable(msg.sender).transfer(msg.value);
        return;
    }

        recordProof(hashing(character));

        //---fire the event---
        owners.push(Owner(owner, character, time));

        emit NameAdded(msg.sender, character, hashing(character), time, owner);
        //payable(msg.sender).transfer(msg.value);
    }

    // SHA256 for Integrity
    function hashing(string memory character) private pure returns (bytes32) {
        return sha256(bytes(character));
    }

    // check name of student in this class
    function checkCharacter(string memory character) public view returns (bool) {
        return listCharacter[hashing(character)];
    }


    function getOwnerCharacter() public view returns(Owner[] memory){
    return owners;
  }
}
