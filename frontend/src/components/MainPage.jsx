import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPage.css';
import {connect} from '../contractMethods';

// MainPage component function
const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for myContract
        const storedContract = JSON.parse(localStorage.getItem('myContract'));
        if (storedContract) {
          navigate('/display-campaigns');
        }
        else {
          navigate('/');
        }
      }, []);

      // Function to connect Metamask and store contract in localStorage
    async function connectMetamask() {
        const contract = await connect();
        // Store myContract in localStorage
        if (contract) {
          localStorage.setItem('myContract', JSON.stringify(contract));
          navigate('/display-campaigns');
        }

    }

    return (
        <div className='connectWallet'>
            <div className='typingContainer'>
                <div className='typing'>Fund Your Dreams</div>
            </div>
            <div className="walletButtonContainer">
                <button className='walletButton' onClick={connectMetamask}>
                    Connect to Metamask
                </button>
            </div>
        </div>
    );
}

export default MainPage;
