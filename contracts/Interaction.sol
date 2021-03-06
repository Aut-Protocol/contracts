//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./IDAOExpander.sol";

contract Interaction {
    event InteractionIndexIncreased(address member, uint256 total);
    using Counters for Counters.Counter;

    Counters.Counter private idCounter;

    struct InteractionModel {
        address member;
        uint256 taskID;
        address contractAddress;
    }

    modifier onlyActivitiesWhitelisted() {
        bool whitelisted = IDAOExpander(daoExpander)
            .isActivityWhitelisted(msg.sender);
        require(whitelisted, 'Not whitelisted address');
        _;
    }

    mapping(uint256 => InteractionModel) interactions;
    mapping(address => uint256) interactionsIndex;

    address public daoExpander;
    address public discordBotAddress;

    constructor() {
        daoExpander = msg.sender;
    }

    function addInteraction(uint256 activityID, address member) public onlyActivitiesWhitelisted {
        InteractionModel memory model = InteractionModel(member, activityID, msg.sender);

        idCounter.increment();
        interactions[idCounter.current()] = model;
        interactionsIndex[member]++;

        emit InteractionIndexIncreased(member, interactionsIndex[member]);
    }

    // view
    function getInteraction(uint256 interactionID)
        public
        view
        returns (InteractionModel memory)
    {
        return interactions[interactionID];
    }

    function getInteractionsIndexPerAddress(address user)
        public
        view
        returns (uint256)
    {
        return interactionsIndex[user];
    }
}
