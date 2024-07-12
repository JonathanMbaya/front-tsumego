import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import './AdminLayout.css';

/**
 * Le composant AdminLayout définit la mise en page pour les sections administratives de l'application.
 * Il inclut une barre de navigation spécifique à l'administration, une section principale pour le contenu
 * rendu par les routes enfants, et un pied de page.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant AdminLayout.
 */
const AdminLayout = () => {
    return (
        <div>
            <header>
                <NavbarAdmin /> {/* Barre de navigation pour les pages administratives */}
            </header>
            <div className="page-admin">
                <main>
                    <Outlet /> {/* Rendu des composants enfants en fonction de la route actuelle */}
                </main>
                <footer className="border-top mt-4">
                    <p className="text-center text-secondary py-4">&copy; Tsumego 2024</p> {/* Pied de page */}
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
