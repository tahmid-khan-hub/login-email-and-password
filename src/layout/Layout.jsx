import React from 'react';
import { Outlet } from 'react-router';
import Navabr from '../components/Navabr/Navabr';

const Layout = () => {
    return (
        <div>
            <Navabr></Navabr>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;