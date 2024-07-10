import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarAdmin.css";
import { getUser, removeUser } from "../../services/session/session";
import { logout } from "../../services/api/user";

function NavbarAdmin() {
    const navigate = useNavigate();
    const location = useLocation();  // Utiliser useLocation pour obtenir le chemin actuel
    const user = getUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // requête de déconnexion
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

    // Fonction pour vérifier si un lien est actif
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
                                <Link to={"/login"}>Déconnexion</Link>
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
