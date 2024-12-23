import { RxDashboard } from "react-icons/rx";
import { MdOutlineCampaign, MdOutlinePayments } from "react-icons/md"; 
import { IoIosLogOut } from "react-icons/io"; 

// Navigation links array
export const navlinks = [
  {
    id: 0,
    name: 'dashboard',
    imgUrl: <RxDashboard></RxDashboard>, // Dashboard icon component
    link: '/display-campaigns', // Link to display campaigns
  },
  {
    id: 1,
    name: 'campaign',
    imgUrl: <MdOutlineCampaign></MdOutlineCampaign>, // Campaign icon component
    link: '/create-campaign', // Link to create a new campaign
  },
  {
    id: 2,
    name: 'My Campaigns',
    imgUrl: <MdOutlinePayments></MdOutlinePayments>, // Payments icon component
    link: '/my-campaigns', // Link to view user's campaigns
  },
  {
    id: 3,
    name: 'logout',
    imgUrl: <IoIosLogOut></IoIosLogOut>, // Logout icon component
    link: '/', // Link for logging out
  },
];

// Array to store additional campaign details
export let restCampaignDetails = [];
