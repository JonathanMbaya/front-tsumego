// Navbar.jsx
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='navbar'>
      <nav>

        <div className='navbar-ul'>

          <div className='logo'>
            <Link>
              <h3>TSUMEGO</h3>
            </Link>
          </div>

          <div className='nav-central'>

            <li>
              <Link to="/" className="link-without-decoration">
                <span class="material-symbols-outlined">
                  home
                </span>
              </Link>
            </li>

            <li>
              <Link to="/listgames" className="link-without-decoration item-nav">Jouer au Tsumego 
                <span class="material-symbols-outlined">
                  sports_esports
                </span>
              </Link>
            </li>
            
            <li>
              <Link to="/" className="link-without-decoration item-nav">Soumettre un problème</Link>
            </li>

          </div>

          <div className="icon">


            <Link to="/"> {/* Assurez-vous que le lien est correct */}
              <span class="material-symbols-outlined">account_circle </span> | Se connecter
            </Link>


          </div>
          
        </div>

      </nav>

      <div className="burger-icon" onClick={toggleMenu}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <div className="icon">
            <Link to="/"> {/* Assurez-vous que le lien est correct */}
              <span class="material-symbols-outlined">account_circle </span> | Se connecter
            </Link>
          </div>
          <li>
            <Link to="/" className="link-without-decoration">Accueil</Link>
          </li>
          <li>
            <Link to="/listgames" className="link-without-decoration">Jouer au Tsumego</Link>
          </li>
          <li>
            <Link to="/" className="link-without-decoration">Soumettre un problème</Link>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Navbar;
