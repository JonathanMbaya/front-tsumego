import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarAdmin.css";
import { getUser, removeUser } from "../../services/session/session";
import { logout } from "../../services/api/user";

/**
 * Composant NavbarAdmin pour afficher la barre de navigation de l'administrateur.
 * @component
 * @returns {JSX.Element} Élément JSX du composant NavbarAdmin.
 */
function NavbarAdmin() {
    const navigate = useNavigate();
    const location = useLocation(); // Utiliser useLocation pour obtenir le chemin actuel
    const user = getUser();
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Fonction pour basculer l'état du menu burger.
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Fonction pour gérer la déconnexion de l'utilisateur.
     */
    const handleLogout = () => {
        // Requête de déconnexion
        const execAsync = async () => {
            try {
                const response = await logout();
                removeUser();
                navigate(0);
            } catch (error) {
                const errorData = error?.response;
                if (errorData) console.log(errorData);
            }
        };
        execAsync();
    };

    /**
     * Fonction pour vérifier si un lien est actif.
     * @param {string} path - Le chemin du lien à vérifier.
     * @returns {boolean} - True si le lien est actif, sinon False.
     */
    const isLinkActive = (path) => location.pathname === path;

    return (
        <>
            <div className="nav-burger-menu">
                <div className="burger-icon" onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>

            <div className={`menu-admin ${isOpen ? "open" : ""}`}>
                <ul className="ul-admin">
                    {!user && (
                        <>
                            <li>
                                <Link to={"/login"}>Déconnexion <span className="material-symbols-outlined">logout</span></Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <Link to={"#"} className="d-flex">
                                    <span className="material-symbols-outlined pe-2">account_circle</span>
                                    {user.user.username}
                                </Link>
                            </li>
                            <li>
                                <Link to={"/"} onClick={handleLogout}>Déconnexion</Link>
                            </li>
                            {user.user.role.is_admin && (
                                <li>
                                    <Link to={"#"} className="d-flex">Administration</Link>
                                </li>
                            )}
                        </>
                    )}
                    <li>
                        <Link
                            to="/admin/listplayers"
                            className={`link-without-decoration li-admin ${isLinkActive("/admin/listplayers") ? "active-link" : ""}`}
                        >
                            Liste de joueurs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/problems"
                            className={`link-without-decoration li-admin ${isLinkActive("/admin/problems") ? "active-link" : ""}`}
                        >
                            Problèmes
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavbarAdmin;
