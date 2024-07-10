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

const routes = createBrowserRouter([
    {
        path: "/signup",
        element: <SignupView />
    },
    {
        path: "/login",
        element: <LoginView />
    },
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                path: "",
                element: <ListTsumego />
            },
            {
                path: "listgames",
                element: <ListTsumego />
            },
            {
                path: "listgames/game/:id",
                element: <TsumegoGame />
            },
            {
                path: "submit-problem",
                element: <ProposeTusmegoView />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "listplayers",
                element: <ListPlayerView/>
            },
            {
                path: "stats",
                element: <StatsView/>
            },
            {
                path: "problems",
                element: <ProblemView/>
            }
        ]
    }
])
export default routes;