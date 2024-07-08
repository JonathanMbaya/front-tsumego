import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation} from 'react-router-dom';
import './Header.css';

function Header({ currentPage }) {
    const location = useLocation();

    return (
        <div>

            {location.pathname === '/' && 
                <Navbar />
            }

            {location.pathname === '/listgames' && 
                <Navbar />
            }

            {location.pathname.startsWith('/listgames/game') && (
                <Navbar />
            )}

            {location.pathname === '/submit-problem' && 
                <Navbar />
            }


        </div>
    );
};

export default Header;
