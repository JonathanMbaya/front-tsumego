// Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getUser, removeUser } from "../../services/session/session";
import { logout } from "../../services/api/user";

function Navbar() {
  const navigate = useNavigate()
   const user = getUser();
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };
   const handleLogout = () => {
    // requête de déconnexion
    const execAsync = async () => {
      try {
        const response = await logout()
        removeUser()
        navigate(0)
      } catch (error) {
        const errorData = error?.response;
        if (errorData) console.log(errorData);
      }
    }
    execAsync()
   }

   return (
      <div className="navbar">
         <nav>
            <div className="navbar-ul">
               <div className="logo">
                  <Link to="/">
                     <h3>TSUMEGO</h3>
                  </Link>
               </div>

               <div>
                  {/* <li>
                     <Link to="/" className="link-without-decoration">
                        <span class="material-symbols-outlined">home</span>
                     </Link>
                  </li> */}
                  <ul className="nav-central">
                     <li>
                        <Link
                           to="/listgames"
                           className="link-without-decoration item-nav"
                        >
                           Accéder au Tsumego
                           <span class="material-symbols-outlined">
                              sports_esports
                           </span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/submit-problem"
                           className="link-without-decoration item-nav"
                        >
                           Soumettre un problème
                        </Link>
                     </li>
                  </ul>
               </div>

               <div>
                  {!user && (
                     <ul className="d-flex">
                        <li className="me-0 border-2 border-end border-dark-subtle">
                           <Link to={"/login"}>connexion</Link>
                        </li>
                        <li className="ms-0">
                           <Link to={"/signup"}>Inscription</Link>
                        </li>
                     </ul>
                  )}
                  {user && (
                     <div className="dropdown">
                        <a
                           href="#"
                           className="dropdown-toggle d-flex align-items-center"
                           role="button"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                        >
                           <span className="material-symbols-outlined pe-2">
                              account_circle
                           </span>
                           {user.user.username}
                        </a>
                        <ul class="dropdown-menu">
                           {/* <li><Link className="dropdown-item" to="#">Mon compte</Link></li> */}
                           <li>
                              <button
                                 className="dropdown-item d-flex"
                                 onClick={handleLogout}
                              >
                                 <span className="material-symbols-outlined pe-2">
                                    logout
                                 </span>
                                 Déconnexion
                              </button>
                           </li>
                           {user.user.role.is_admin && (
                              <li>
                                 <Link className="dropdown-item" to="#">
                                    Administration
                                 </Link>
                              </li>
                           )}
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </nav>

         <div className="nav-burger-menu">
            <div className="logo">
               <Link to="/">
                  <h3>TSUMEGO</h3>
               </Link>
            </div>

            <div className="burger-icon" onClick={toggleMenu}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>

         <div className={`menu ${isOpen ? "open" : ""}`}>
            <ul>
               {!user && (
                  <>
                     <li>
                        <Link to={"/login"}>connexion</Link>
                     </li>
                     <li>
                        <Link to={"/signup"}>Inscription</Link>
                     </li>
                  </>
               )}
               {user && (
                  <>
                    <li><Link to={"#"} className="d-flex"><span className="material-symbols-outlined pe-2">account_circle</span>{user.user.username}</Link></li>
                    <li><Link to={"/"} onClick={handleLogout}>Déconnexion</Link></li>
                    {user.user.role.is_admin && <li><Link to={"#"} className="d-flex">Administration</Link></li>}
                  </>                                                      
                  )}
               <li>
                  <Link to="/" className="link-without-decoration">
                     Accueil
                  </Link>
               </li>
               <li>
                  <Link to="/listgames" className="link-without-decoration">
                     Jouer au Tsumego
                  </Link>
               </li>
               <li>
                  <Link
                     to="/submit-problem"
                     className="link-without-decoration"
                  >
                     Soumettre un problème
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default Navbar;
