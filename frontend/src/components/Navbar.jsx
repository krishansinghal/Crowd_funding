import { CustomButton } from './';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

// Navbar component function
const Navbar = (props) => {
  const navigate = useNavigate();

   // Function to navigate to create campaign form
  function openCampaignForm() {
    navigate('/create-campaign');
  }
  return (
    <div>
      <div className='navbar'>
        <h1 className='header'>{props.header}</h1>
        <CustomButton 
          btnType="button"
          title="Create a Campaign"
          onClick = {openCampaignForm}
        />
      </div>
    </div>
  )
}

export default Navbar