import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imgfiles/pnlogo.png';

export const HomeHeading = () => {
    return (
        <div className="flex bg-gray-200">
            <div className="m-3">
                <Link to="/">
                    <img src={logo} alt='logo' className='relative' width='50' height='50' />
                </Link>
            </div>
            <div className="flex items-center">
                <div className="flex-grow text-center px-4 py-2 m-2">
                    <h5 className="text-gray-900 font-medium text-xl">Manage Recipients</h5>
                </div>
            </div>
            <div className="flex-grow text-right px-4 py-2 m-3">
                <Link to="/add" style={{ textDecoration: 'none' }}>
                    <button className="bg-blue-pn hover:bg-blue-400 text-white font-semibold text-sm py-2 px-4 rounded inline-flex items-center focus:outline-none focus:shadow-outline">
                        <span>Create New Recipient</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}