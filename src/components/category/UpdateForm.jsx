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
    kategoryId: Yup.string().required("Required"),
    kategoryAdi: Yup.string().required("Required"),
    kategoryAciklama: Yup.string().required("Required"),
    kategoryMetaAciklama: Yup.string().required("Required"),
    ustKategory: Yup.string().required("Required"),
    kategoryFoto: Yup.string().required("Required"),
    kategorySeoUrl: Yup.string().required("Required"),
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
                    name="kategoryId"
                    label="Kategory Id"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="kategoryAdi"
                    label="Kategory Adi"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="kategoryAciklama"
                    label="Urun Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="kategoryMetaAciklama"
                    label="Meta Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="ustKategory"
                    label="Ust Kategory"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="kategoryFoto"
                    label="Kategory Foto"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="kategorySeoUrl"
                    label="Kategory Seo Url"
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
