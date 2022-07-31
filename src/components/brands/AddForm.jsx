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
    markaId: "",
    markaAdi: "",
    markaAciklama: "",
    markaMetaAciklama: "",
    markaFoto: "",
    markaSeoUrl: "",
  };
  const validationSchema = Yup.object({
    markaId: Yup.number().positive().required("Required"),
    markaAdi: Yup.string().required("Required"),
    markaAciklama: Yup.string().required("Required"),
    markaMetaAciklama: Yup.string().required("Required"),
    markaFoto: Yup.mixed().required("Required"),
    markaSeoUrl: Yup.string().url().required("Required"),
  });

  const handleAddData = (values, onSubmitProps) => {
    Swal.fire({
      title: "Do you want to Add this Brand?",
      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      onSubmitProps.setSubmitting(false);
      if (result.isConfirmed) {
        HTTP.post(`/posts`, initialValues)
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
              <Row>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaId"
                    label="Marka Id"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaAdi"
                    label="Marka Adi"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaAciklama"
                    label="Marka Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaMetaAciklama"
                    label="Marka Meta Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaFoto"
                    label="Marka Foto"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="markaSeoUrl"
                    label="Marka Seo Url"
                  />
                </Col>
              </Row>
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
