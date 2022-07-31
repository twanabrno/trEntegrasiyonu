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
    urunId: Yup.number().positive().required("Required"),
    urunIsim: Yup.string().required("Required"),
    urunAciklama: Yup.string().required("Required"),
    urunMetaAciklama: Yup.string().required("Required"),
    urunKod: Yup.number()
      .positive()
      .test(
        "len",
        "Must be exactly 5 characters",
        (val) => val.length === 5
      )
      .required("Required"),
    urunModelKod: Yup.number()
      .positive()
      .test(
        "len",
        "Must be exactly 5 characters",
        (val) => val.length === 5
      )
      .required("Required"),
    urunBarkod: Yup.number()
      .positive()
      .test(
        "len",
        "Must be exactly 5 characters",
        (val) => val.length === 5
      )
      .required("Required"),
    urunStok: Yup.number().positive().required("Required"),
    urunStokStatue: Yup.number().positive().required("Required"),
    urunFiyat: Yup.number().positive().required("Required"),
    urunFiyatKdv: Yup.number().positive().required("Required"),
    urunKategory: Yup.string().required("Required"),
    urunOzellikler: Yup.string().required("Required"),
    urunFiltre: Yup.string().required("Required"),
    urunFoto: Yup.mixed().required("Required"),
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
                    name="urunId"
                    label="Urun Id"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunIsim"
                    label="Urun Isim"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunAciklama"
                    label="Urun Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunMetaAciklama"
                    label="Urun Meta Aciklama"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunKod"
                    label="Urun Kod"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunModelKod"
                    label="Urun Model Kod"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunBarkod"
                    label="Urun Barkod"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunStok"
                    label="Urun Stok"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunStokStatue"
                    label="Urun Stok Statue"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunFiyat"
                    label="Urun Fiyat"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunFiyatKdv"
                    label="Urun Fiyat Kdv"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunKategory"
                    label="Urun Kategory"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunOzellikler"
                    label="Urun Ozellikleri"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunFiltre"
                    label="Urun Filtre"
                  />
                </Col>
                <Col md="4">
                  <FormikController
                    control="input"
                    type="text"
                    name="urunFoto"
                    label="Urun Foto"
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
