import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ListTsumego from "../pages/ListTsumego";
import TsumegoGame from "../pages/TsumegoGame";
import SignupView from "../pages/client/SignupView/SignupView";
import LoginView from "../pages/client/LoginView/LoginView";
import ClientLayout from "../pages/client/ClientLayout";
import ProposeTusmegoView from "../pages/client/ProposeTsumegoView/ProposeTusmegoView";
import AdminLayout from "../pages/admin/AdminLayout";
import ListPlayerView from "../pages/admin/ListPlayersView/ListPlayerView";
import StatsView from "../pages/admin/StatsView/StatsView";
import ProblemView from "../pages/admin/SubmitProblemsView/ProblemView";

// Création des routes avec createBrowserRouter
const routes = createBrowserRouter([
    // Route pour l'inscription
    {
        path: "/signup",  // Chemin de l'URL "/signup"
        element: <SignupView />  // Affiche le composant SignupView lorsque l'URL correspond à "/signup"
    },
    // Route pour la connexion
    {
        path: "/login",  // Chemin de l'URL "/login"
        element: <LoginView />  // Affiche le composant LoginView lorsque l'URL correspond à "/login"
    },
    // Routes pour les utilisateurs clients
    {
        path: "/",  // Chemin de l'URL racine "/"
        element: <ClientLayout />,  // Layout principal pour les routes client
        children: [
            // Route par défaut pour afficher la liste des problèmes
            {
                path: "",  // Chemin de l'URL (sans extension)
                element: <ListTsumego />  // Affiche le composant ListTsumego lorsque l'URL correspond à "/"
            },
            // Route pour afficher la liste des jeux
            {
                path: "listgames",  // Chemin de l'URL pour la liste des jeux "/listgames"
                element: <ListTsumego />  // Affiche le composant ListTsumego lorsque l'URL correspond à "/listgames"
            },
            // Route pour afficher un jeu spécifique par son ID
            {
                path: "listgames/game/:id",  // Chemin de l'URL pour un jeu spécifique avec l'ID dynamique "/listgames/game/:id"
                element: <TsumegoGame />  // Affiche le composant TsumegoGame lorsque l'URL correspond à "/listgames/game/:id"
            },
            // Route pour soumettre un problème
            {
                path: "submit-problem",  // Chemin de l'URL pour soumettre un problème "/submit-problem"
                element: <ProposeTusmegoView />  // Affiche le composant ProposeTusmegoView lorsque l'URL correspond à "/submit-problem"
            }
        ]
    },
    // Routes pour les administrateurs
    {
        path: "/admin",  // Chemin de l'URL "/admin"
        element: <AdminLayout />,  // Layout principal pour les routes admin
        children: [
            // Route pour afficher la liste des joueurs
            {
                path: "listplayers",  // Chemin de l'URL pour la liste des joueurs "/admin/listplayers"
                element: <ListPlayerView />  // Affiche le composant ListPlayerView lorsque l'URL correspond à "/admin/listplayers"
            },
            // Route pour afficher les statistiques
            {
                path: "stats",  // Chemin de l'URL pour les statistiques "/admin/stats"
                element: <StatsView />  // Affiche le composant StatsView lorsque l'URL correspond à "/admin/stats"
            },
            // Route pour soumettre des problèmes
            {
                path: "problems",  // Chemin de l'URL pour soumettre des problèmes "/admin/problems"
                element: <ProblemView />  // Affiche le composant ProblemView lorsque l'URL correspond à "/admin/problems"
            }
        ]
    }
]);

export default routes;  // Exporte les routes configurées


