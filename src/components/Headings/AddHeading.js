import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imgfiles/pnlogo.png';

export const AddHeading = () => {
    return (
        <div className="flex bg-gray-200">
            <div className="m-3">
                <Link to="/">
                    <img src={logo} alt='logo' className='flex-grow' width='50' height='50' />
                </Link>
            </div>
            <div className="flex items-center">
                <div className="flex-grow text-center px-4 py-2 m-2">
                    <h5 className="text-gray-900 font-medium text-xl">Create New Recipient</h5>
                </div>
            </div>
            <div className="flex-grow text-right px-4 py-2 m-3">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className="bg-white hover:text-blue-400 text-blue-pn font-semibold text-sm py-2 px-4 rounded inline-flex items-center focus:outline-none focus:shadow-outline">
                        <span>Cancel</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}