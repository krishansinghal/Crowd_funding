import { ethers } from 'ethers';
import { abi } from './abi'; 
import PinataClient from '@pinata/sdk'; 
import { restCampaignDetails } from './constants'; 

// Function to initiate the contract connection
async function initiateContract() {
  let provider = new ethers.BrowserProvider(window.ethereum); // Create ethers provider using window.ethereum
  let signer = await provider.getSigner(); // Get signer from provider
  const contract = new ethers.Contract(`${import.meta.env.VITE_CONTRACT_ADDRESS}`, abi, signer); // Instantiate contract
  return contract;
}

// Function to initiate Pinata client
function initiatePinataClient() {
  return new PinataClient({
    pinataApiKey: `${import.meta.env.VITE_PINATA_API_KEY}`,
    pinataSecretApiKey: `${import.meta.env.VITE_PINATA_API_SECRET}`
  });
}

// Main connect function to interact with MetaMask and initiate contract
export async function connect() {
  let res = await connectToMetamask(); // Connect to MetaMask
  if (res === true) {
    await changeNetwork(); 
    try {
      const contract = await initiateContract(); // Initiate contract connection
      return contract;
    } catch (err) {
      alert("CONTRACT_ADDRESS not set properly"); // Alert if contract address is not set properly
      console.log(err);
    }
  } else {
    alert("Couldn't connect to Metamask"); // Alert if unable to connect to MetaMask
  }
}

// Function to connect to MetaMask
async function connectToMetamask() {
  try {
    await window.ethereum.enable(); // Enable MetaMask connection
    return true;
  } catch (err) {
    return false;
  }
}

// Function to change network
async function changeNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // Switch to custom network chain ID
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x539",
              chainName: "Ganache",
              nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["http://127.0.0.1:7545"],
            },
          ],
        });
      } catch (addError) {
        alert("Error in adding Ganache network");
      }
    }
  }
}

// Function to fetch campaign details from IPFS based on hash
async function getCampaignDetailsByHash(hash) {
  const url = `${import.meta.env.VITE_IPFS_URL}/${hash}`;
  const data = await fetch(url);
  let jsonData = await data.json();
  return jsonData;
}

// Function to upload campaign details to IPFS using Pinata
async function uploadToIpfs(title, description, imageUrl) {
  const pinata = initiatePinataClient(); // Initiate Pinata client
  let allCampaigns = await getAllCampaigns(); // Get all campaigns
  let campaignId = allCampaigns.length; // Calculate new campaign ID

  let campaignDetails = {
    campaignId: campaignId,
    title: title,
    description: description,
    image: imageUrl
  };

  try {
    const pinataOptions = {
      pinataMetadata: {
        name: `Campaign${campaignId}Data.json`
      }
    };

    const { IpfsHash } = await pinata.pinJSONToIPFS(campaignDetails, pinataOptions); // Upload JSON to IPFS

    return IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return null;
  }
}

// Function to get all campaigns from the contract and IPFS
export async function getAllCampaigns() {
  const contract = await initiateContract(); // Initiate contract
  const campaigns = await contract.getCampaigns(); // Get campaigns from contract

  for (let i = 0; i < campaigns.length; i++) {
    const data = await getCampaignDetailsByHash(campaigns[i].ipfsHash); // Get campaign details from IPFS
    let found = restCampaignDetails.find(details => details.campaignId === data.campaignId); // Check if campaign details already exist
    if (found) {
      continue;
    }
    restCampaignDetails.push(data); // Add new campaign details
  }

  return campaigns; // Return all campaigns
}

// Function to create a new campaign
export async function createNewCampaign(title, description, goal, imageUrl, category, endDate) {
  let campaignId;
  const contract = await initiateContract(); // Initiate contract
  let provider = new ethers.BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  const address = signer.address;
  let currentDate = Math.floor(new Date().getTime() / 1000);
  const date = Math.floor(new Date(endDate).getTime() / 1000);
  let daysLeft = Math.floor((date - currentDate) / (60 * 60 * 24));

  try {
    if (daysLeft > 0 && parseInt(goal) > 0) {
      let returnedHash = await uploadToIpfs(title, description, imageUrl);
      const tx = await contract.createCampaign(address, returnedHash, goal, date, category, { gasLimit: 300000, from: `${signer.address}` }); // Create new campaign transaction
      campaignId = await tx.wait();
    } else {
      alert("Please enter correct details"); 
    }
  } catch (err) {
    alert("Something went wrong while creating campaign");
    window.location.href = '/create-campaign'; 
  }
  return campaignId;
}

// Function to donate to a campaign
export async function donate(campaignId, amount) {
  const contract = await initiateContract();
  let provider = new ethers.BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  const address = signer.address;

  try {
    const campaignDetails = await contract.campaigns(campaignId); 
    let target = parseInt(campaignDetails[2]); 
    let raised = parseInt(campaignDetails[4]) / 10 ** 18; 

    if (raised + parseInt(amount) <= target) {
      if (parseInt(amount) > 0) {
        const tx = await contract.donateToCampaign(campaignId, { gas: 300000, from: address, value: ethers.parseEther(amount.toString()) }); // Donate to campaign transaction
        await tx.wait(); 
        return true;
      } else {
        alert("Please enter valid amount"); 
      }
    } else {
      alert("Please enter less amount than required"); 
    }
  } catch (err) {
    alert("Something went wrong while donation");
    console.log(err);
  }
  return false;
}
