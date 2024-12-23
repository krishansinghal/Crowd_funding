// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract CrowdFunding {
    // Define a struct to store details of a campaign
    struct Campaign {
        address owner;             // Address of the campaign owner
        string ipfsHash;           // IPFS hash for storing campaign details
        uint256 target;            // Target amount to be collected
        uint256 deadline;          // Deadline for the campaign
        uint256 amountCollected;   // Amount collected so far
        string category;           // Category of the campaign
        address[] donators;        // List of donators
        uint256[] donations;       // Corresponding donations by the donators
    }

    // Mapping to store campaigns with campaign ID as the key
    mapping(uint256 => Campaign) public campaigns;

    // Variable to store the total number of campaigns
    uint256 public numberOfCampaigns = 0;

    // Function to create a new campaign
    function createCampaign(address _owner, string memory _ipfsHash, uint256 _target, uint256 _deadline, string memory _category) public returns (uint256) {
        // Create a new campaign and store it in the campaigns mapping
        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.ipfsHash = _ipfsHash;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.category = _category;
        campaign.amountCollected = 0;

        // Increment the campaign counter
        numberOfCampaigns++;

        // Return the campaign ID
        return numberOfCampaigns - 1;
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        // Get the campaign from the campaigns mapping
        Campaign storage campaign = campaigns[_id];

        // Add the donator and the donation amount to the campaign
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Transfer the donation amount to the campaign owner
        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        // If the transfer is successful, update the amount collected
        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // Function to get the list of donators and their donations for a specific campaign
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Function to get the details of all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // Loop through the campaigns mapping and store each campaign in the array
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
