import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { login } from "../../../services/api/user";
import { useNavigate } from "react-router-dom";
import { getUser, setLoggedUser } from "../../../services/session/session";

const LoginView = () => {
   const navigate = useNavigate();
   const user = getUser()
   const [errorMessage, setErrorMessage] = useState("")
   const initials = { username: "", password: "" };
   const schema = {
      username: Yup.string().required("Veuilllez saisir votre pseudo"),
      password: Yup.string().required("Veuillez saisir un mot de passe"),
   };

   useEffect(() => {
    if(user)
        navigate("/")
   }, [])

   return (
      <div>
        {errorMessage && <p>{errorMessage}</p>}
         <Formik
            initialValues={initials}
            validationSchema={Yup.object(schema)}
            onSubmit={(values) => {
                const execAsync = async () => {
                    try {
                        const response = await login(values)
                        // enregistrement de l'utilisateur et de son token en stockage local
                        setLoggedUser(response.data);
                        // redirection page d'accueil
                        navigate("/");
                    } catch (error) {
                        const errorData = error?.response?.data
                        if (errorData) setErrorMessage("Pseudo ou mot de passe incorrect")
                    }
                }
                execAsync()
            }}
         >
            <Form>
               <div>
                  <label htmlFor="username">Pseudo</label>
                  <Field name="username" type="text" />
                  <ErrorMessage name="username" />
               </div>
               <div>
                  <label htmlFor="password">Mot de passe</label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" />
               </div>
               <div>
                  <button type="submit">Se connecter</button>
               </div>
            </Form>
         </Formik>
      </div>
   );
};

export default LoginView;
