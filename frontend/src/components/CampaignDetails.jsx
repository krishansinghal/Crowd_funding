import React from "react";
import DetailsCard from "./DetailsCard";
import '../css/CampaignDetails.css';
import { Sidebar } from "./index";

// CampaignDetails component function
const CampaignDetails = ({ campaignArray, restDetails, index }) => {
   // Extracting campaign ID from index prop
   let campaignId = parseInt(index.substr(index.length - 1));

   return (
      <div className="campaign-details">
         <Sidebar/> {/* Sidebar component */}
         {/* DetailsCard component with details props */}
         <DetailsCard details={campaignArray[campaignId]} restDetails={restDetails[campaignId]} index={campaignId}/>
      </div>
    );
}

export default CampaignDetails;
