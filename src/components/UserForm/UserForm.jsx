import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { singup } from "../../services/api/user";
import { setLoggedUser } from "../../services/session/session";
import { Link, useNavigate } from "react-router-dom";
import "./UserForm.css";

/**
 * Composant de formulaire d'inscription des utilisateurs.
 *
 * @component
 * @example
 * return (
 *   <UserForm />
 * )
 */
const UserForm = () => {
   const navigate = useNavigate(); // Hook pour naviguer vers d'autres pages
   const [errorMessage, setErrorMessage] = useState(""); // État pour stocker les messages d'erreur

   /**
    * Valeurs initiales du formulaire.
    * @type {Object}
    * @property {string} email - Adresse email de l'utilisateur
    * @property {string} username - Pseudo de l'utilisateur
    * @property {string} password - Mot de passe de l'utilisateur
    * @property {string} confirmPassword - Confirmation du mot de passe
    */
   const initials = { email: "", username: "", password: "", confirmPassword: "" };

   /**
    * Schéma de validation du formulaire avec Yup.
    *
    * @type {Yup.ObjectSchema}
    */
   const schema = Yup.object({
      email: Yup.string()
         .email("Veuillez saisir une adresse email valide")
         .required("Veuillez saisir une adresse email"),
      username: Yup.string()
         .min(4, "Votre pseudo doit contenir 4 caractères minimum")
         .required("Veuillez saisir votre pseudo"),
      password: Yup.string()
         .required("Veuillez saisir un mot de passe")
         .min(6, "Votre mot de passe doit contenir 6 caractères minimum"),
      confirmPassword: Yup.string()
         .required("Veuillez confirmer le mot de passe")
         .min(6, "Votre mot de passe doit contenir 6 caractères minimum")
         .oneOf([Yup.ref("password"), null], "Vos mots de passe doivent être les mêmes"),
   });

   return (
      <div className="signup-card py-5 mx-auto px-3">
         <h1 className="mt-0 mb-5">Inscription</h1>
         {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
         <Formik
            initialValues={initials}  // Valeurs initiales du formulaire
            validationSchema={schema}  // Schéma de validation
            onSubmit={async (values) => {
               try {
                  const response = await singup(values);  // Appel à l'API pour inscrire l'utilisateur
                  setLoggedUser(response.data);  // Enregistrement des données de l'utilisateur et du token en session
                  navigate("/listgames");  // Redirection vers la page d'accueil après l'inscription réussie
               } catch (error) {
                  const errorData = error?.response?.data?.message || "Erreur lors de l'inscription";  // Gestion des erreurs d'inscription
                  setErrorMessage(errorData);  // Affichage des erreurs
               }
            }}
         >
            <Form>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3">
                  <label htmlFor="username" className="form-label">Pseudo</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                     Confirmer le mot de passe
                  </label>
                  <Field name="confirmPassword" type="password" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">S&apos;inscrire</button>
               </div>
               <div className="text-center">
                  <small>Vous avez un compte? <Link to={"/login"} className="text-primary">Connectez-vous</Link></small>
               </div>
            </Form>
         </Formik>
      </div>
   );
};

export default UserForm;
