import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const UserForm = () => {
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
    .oneOf([Yup.ref("password"), null], "Vos mots de passe doivent être les mêmes")
   }

   return (
      <div>
         <Formik
            initialValues={initials}
            validationSchema={Yup.object(schema)}
            onSubmit
         >
            <Form>
               <div>
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />
                  <ErrorMessage name="email" />
               </div>
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
                  <label htmlFor="confirmPassword">
                     Confimer le mot de passe
                  </label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword" />
               </div>
               <div>
                  <button type="submit">S'inscrire</button>
               </div>
            </Form>
         </Formik>
      </div>
   );
};

export default UserForm;
