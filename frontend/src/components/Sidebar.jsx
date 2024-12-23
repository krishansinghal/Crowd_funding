import React from 'react';
import '../css/Sidebar.css'; // Import your custom CSS file
import {Icon} from './index';
import { navlinks } from '../constants/index';

// Sidebar component function
const Sidebar = () => {
    return (
        <div className="sidebar">
          {navlinks.map((navlink) => <Icon key={navlink.id} link = {navlink.link} imgUrl = {navlink.imgUrl}></Icon>)}
        </div>
    );
}

export default Sidebar;
