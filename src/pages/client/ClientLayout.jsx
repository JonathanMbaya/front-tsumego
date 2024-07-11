import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


/**
 * Le composant ClientLayout représente la mise en page pour les pages côté client.
 * Il inclut une barre de navigation, une zone de contenu principal, et un pied de page avec des informations sur les droits d'auteur.
 */
const ClientLayout = () => {
   return (
      <div>
         <header>
            <Navbar />
         </header>
         <main>
            <Outlet />
         </main>
         <footer className="border-top mt-4">
            <p className="text-center py-4">&copy; Tsumego 2024</p>
         </footer>
      </div>
   );
};

export default ClientLayout;
