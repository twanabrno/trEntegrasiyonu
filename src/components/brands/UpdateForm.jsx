import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { HTTP } from "../../HTTP";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "../Forms/FormikController";

const UpdateForm = ({
  updateData,
  getData,
  currentPage,
  limit,
  handleUpdateClose,
  ...props
}) => {
  const initialValues = { ...updateData };
  const validationSchema = Yup.object({
    markaId: Yup.string().required("Required"),
    markaAdi: Yup.string().required("Required"),
    markaAciklama: Yup.string().required("Required"),
    markaMetaAciklama: Yup.string().required("Required"),
    markaFoto: Yup.string().required("Required"),
    markaSeoUrl: Yup.string().required("Required"),
  });
  const handleSaveUpdate = (values) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        HTTP.put(`/posts/${values.id}`, values)
          .then((response) => {
            console.log(response.data);
            Swal.fire("Saved!", "", "success");
            handleUpdateClose();
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
        onSubmit={handleSaveUpdate}
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
                Update
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateForm;