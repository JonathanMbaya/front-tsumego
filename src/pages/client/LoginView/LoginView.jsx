import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { login } from "../../../services/api/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, setLoggedUser } from "../../../services/session/session";
import "./LoginView.css"

/**
 * Le composant LoginView gère l'authentification des utilisateurs via un formulaire de connexion.
 * Il affiche des messages d'erreur pour les tentatives de connexion invalides et redirige
 * les utilisateurs authentifiés vers la destination spécifiée ou par défaut.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant LoginView.
 */
const LoginView = () => {
    const location = useLocation(); // Utilise le hook useLocation pour obtenir l'emplacement actuel
    const navigate = useNavigate(); // Utilise le hook useNavigate pour la navigation programmatique
    const user = getUser() ? getUser() : null; // Obtient l'utilisateur authentifié ou null s'il est non authentifié

    const [errorMessage, setErrorMessage] = useState(""); // État pour contenir le message d'erreur
    const initials = { username: "", password: "" }; // Valeurs initiales pour le formulaire de connexion
    const schema = {
        username: Yup.string().required("Veuillez saisir votre pseudo"),
        password: Yup.string().required("Veuillez saisir un mot de passe"),
    };

    const from = location.state?.from || "/listgames"; // Destination de redirection après une connexion réussie

    useEffect(() => {
        // Redirige vers la page d'accueil si l'utilisateur est déjà authentifié
        if (user) {
            navigate("/");
        }
    }, []); // Le tableau de dépendances vide assure que useEffect s'exécute une seule fois

    return (
        <main className="container d-flex align-items-center pt-0">
            <div className="login-card py-5 mx-auto px-3">
                <h1 className="mt-0 mb-5">TSUMEGO</h1>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                <Formik
                    initialValues={initials}
                    validationSchema={Yup.object(schema)}
                    onSubmit={(values) => {
                        const execAsync = async () => {
                            try {
                                const response = await login(values);
                                // enregistrement de l'utilisateur et de son token en stockage local
                                setLoggedUser(response.data);
                                // redirection page d'accueil
                                navigate(from, { replace: true });
                            } catch (error) {
                                const errorData = error?.response?.data;
                                if (errorData) setErrorMessage("Pseudo ou mot de passe incorrect");
                            }
                        };
                        execAsync();
                    }}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Pseudo</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage name="password" />
                        </div>
                        <div className="mb-4 text-center mt-4">
                            <button type="submit" className="btn btn-primary">Se connecter</button>
                        </div>
                        <div className="text-center">
                            <small>Vous n'avez pas de compte? <Link to={"/signup"} className="text-primary">Créez-en un</Link></small>
                        </div>
                    </Form>
                </Formik>
            </div>
        </main>
    );
};

export default LoginView;
