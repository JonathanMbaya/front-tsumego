import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation} from 'react-router-dom';
import './Header.css';

function Header({ currentPage }) {
    const location = useLocation();

    return (
        <div>

            {location.pathname === '/' && 
                <div>

                    <Navbar />
                </div>
            }

            {location.pathname === '/listgames' && 
                <div className='header-product'>
                    <Navbar />
                </div>
            }

            {location.pathname === '/game' && 
                <div className='header-apropos'>
                    <Navbar />
                </div>
            }
        </div>
    );
};

export default Header;
