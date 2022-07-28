import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "./Forms/FormikController";
import { useAuth } from "./temporary/auth";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.path?.state || "/";
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invailed email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    navigate(redirectPath, { replace: true });
  };

  useEffect(() => {
    if(auth.user){
      navigate('/',{replace:true})
    }
  });
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
