import React from 'react';
import Weather from '../Dashboard/Weather';

const Navbar = () => {
    return (
        <nav className="p-8 pl-20 flex justify-between">
            <img className="w-[98px] h-[106px]" src="../assets/logos/andhra-pradesh-state-new-emblem-logo-ECDF9406BD-seeklogo.com.png" alt="" />
            <Weather />
        </nav>
    );
};

export default Navbar;
