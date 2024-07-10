import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { singup } from "../../services/api/user";
import { setLoggedUser } from "../../services/session/session";
import { Link, useNavigate } from "react-router-dom";
import "./UserForm.css"

const UserForm = () => {
   const navigate = useNavigate();
   const [errorMessage, setErrorMessage] = useState("")
   const initials = { email: "", username: "", password: "" };
   const schema = {
      email: Yup.string()
         .email("Veuillez saisir une adresse email valide")
         .required("Veuilllez saisir une adresse email"),
      username: Yup.string()
         .min(4, "Votre pseudo doit contenir 4 caractères minimum")
         .required("Veuilllez saisir votre pseudo"),
      password: Yup.string()
         .required("Veuillez saisir un mot de passe")
         .min(6, "Votre mot de passe doit contenir 6 caractères minimum"),
      confirmPassword: Yup.string()
         .required("Veuillez confirmer le mot de passe")
         .min(6, "Votre mot de passe doit contenir 6 caractères minimum")
         .oneOf(
            [Yup.ref("password"), null],
            "Vos mots de passe doivent être les mêmes",
         ),
   };

   return (
      <div className="signup-card py-5 mx-auto px-3">
          <h1 className="mt-0 mb-5">Inscription</h1>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
         <Formik
            initialValues={initials}
            validationSchema={Yup.object(schema)}
            onSubmit={(values) => {
               const execAsync = async () => {
                  try {
                     const response = await singup(values);
                     // enregistrement de l'utilisateur et de son token en stockage local
                     setLoggedUser(response.data);
                     // redirection page d'accueil
                     navigate("/");
                  } catch (error) {
                    const errorData = error?.response?.data
                    if (errorData) setErrorMessage("Ce pseudo ou cet email existe déjà")
                  }
               };
               execAsync();
            }}
         >
            <Form>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" />
               </div>
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
               <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                     Confimer le mot de passe
                  </label>
                  <Field name="confirmPassword" type="password" className="form-control" />
                  <ErrorMessage name="confirmPassword" />
               </div>
               <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">S&apos;inscrire</button>
               </div>
               <div className="text-center">
                    <small>Vous avez un compte? <Link to={"/login"} className="text-primary">connectez-vous</Link></small>
                </div>
            </Form>
         </Formik>
      </div>
   );
};

export default UserForm;
