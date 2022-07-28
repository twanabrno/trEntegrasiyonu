import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "./Forms/FormikController";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invailed email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, onSubmitProps) => {
    console.log("submitted: ", values);
    onSubmitProps.setSubmitting(false);
  };
  return (
    <div className="login-body d-flex align-items-center">
      <div className="login-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <FormikController
                control="input"
                type="email"
                name="email"
                label="Email"
              />
              <FormikController
                control="input"
                type="password"
                name="password"
                label="Password"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Log in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
