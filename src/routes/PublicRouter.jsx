import React from "react";
import {createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ListTsumego from "../pages/ListTsumego";
import TsumegoGame from "../pages/TsumegoGame";
import SignupView from "../pages/client/SignupView/SignupView";
import FormProblem from "../components/FormProblem/FormProblem";
import LoginView from "../pages/client/LoginView/LoginView";
import ClientLayout from "../pages/client/ClientLayout";

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
                element: <HomePage />
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
                element: <FormProblem />
            }
        ]
    }
])
export default routes