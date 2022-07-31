import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { HTTP } from "../../HTTP";
import Swal from "sweetalert2";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "../Forms/FormikController";

const UpdateForm = ({
  handleAddClose,
  currentPage,
  limit,
  getData,
  ...props
}) => {
  const initialValues = {
    body: "",
  };
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });

  const handleAddData = (values, onSubmitProps) => {
    Swal.fire({
      title: "Do you want to Add this product?",
      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      onSubmitProps.setSubmitting(false);
      if (result.isConfirmed) {
        HTTP.post(`/comments`, initialValues)
          .then((response) => {
            console.log(response.data);
            Swal.fire("Added!", "", "success");
            onSubmitProps.setSubmitting(false);
            handleAddClose();
            getData(limit, currentPage);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.message}`,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddData}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <Modal.Body>
              <FormikController
                control="input"
                type="text"
                name="body"
                label="Body"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button
                variant="success"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Add
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateForm;
