import React from "react";
import { createBrowserRouter } from "react-router-dom"; // Import de la fonction createBrowserRouter depuis react-router-dom
import ListTsumego from "../pages/ListTsumego"; // Import du composant ListTsumego depuis le chemin spécifié
import TsumegoGame from "../pages/TsumegoGame"; // Import du composant TsumegoGame depuis le chemin spécifié
import SignupView from "../pages/client/SignupView/SignupView"; // Import du composant SignupView depuis le chemin spécifié
import LoginView from "../pages/client/LoginView/LoginView"; // Import du composant LoginView depuis le chemin spécifié
import ClientLayout from "../pages/client/ClientLayout"; // Import du composant ClientLayout depuis le chemin spécifié
import ProposeTusmegoView from "../pages/client/ProposeTsumegoView/ProposeTusmegoView"; // Import du composant ProposeTusmegoView depuis le chemin spécifié
import AdminLayout from "../pages/admin/AdminLayout"; // Import du composant AdminLayout depuis le chemin spécifié
import ListPlayerView from "../pages/admin/ListPlayersView/ListPlayerView"; // Import du composant ListPlayerView depuis le chemin spécifié
import StatsView from "../pages/admin/StatsView/StatsView"; // Import du composant StatsView depuis le chemin spécifié
import ProblemView from "../pages/admin/SubmitProblemsView/ProblemView"; // Import du composant ProblemView depuis le chemin spécifié

const routes = createBrowserRouter([
    {
        path: "/signup", // Chemin pour l'inscription
        element: <SignupView /> // Composant à rendre quand le chemin '/signup' est atteint
    },
    {
        path: "/login", // Chemin pour la connexion
        element: <LoginView /> // Composant à rendre quand le chemin '/login' est atteint
    },
    {
        path: "/", // Chemin racine
        element: <ClientLayout />, // Composant de mise en page pour les pages client
        children: [ // Routes enfants sous '/client'
            {
                path: "", // Chemin vide correspondant à '/'
                element: <ListTsumego /> // Composant ListTsumego rendu quand '/client' est atteint
            },
            {
                path: "listgames", // Chemin pour la liste des jeux
                element: <ListTsumego /> // Composant ListTsumego rendu quand '/client/listgames' est atteint
            },
            {
                path: "listgames/game/:id", // Chemin pour un jeu spécifique
                element: <TsumegoGame /> // Composant TsumegoGame rendu quand '/client/listgames/game/:id' est atteint
            },
            {
                path: "submit-problem", // Chemin pour soumettre un problème
                element: <ProposeTusmegoView /> // Composant ProposeTusmegoView rendu quand '/client/submit-problem' est atteint
            }
        ]
    },
    {
        path: "/admin", // Chemin pour l'administration
        element: <AdminLayout />, // Composant de mise en page pour les pages d'administration
        children: [ // Routes enfants sous '/admin'
            {
                path: "listplayers", // Chemin pour la liste des joueurs
                element: <ListPlayerView/> // Composant ListPlayerView rendu quand '/admin/listplayers' est atteint
            },
            {
                path: "stats", // Chemin pour les statistiques
                element: <StatsView/> // Composant StatsView rendu quand '/admin/stats' est atteint
            },
            {
                path: "problems", // Chemin pour les problèmes
                element: <ProblemView/> // Composant ProblemView rendu quand '/admin/problems' est atteint
            }
        ]
    }
]);

export default routes; // Exporte les routes définies pour les utiliser dans l'application
