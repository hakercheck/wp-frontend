import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Modal, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  useGetVendorDisplaysQuery,
  useDeleteVendorDisplayMutation,
} from "../slices/vendorDisplayApiSlice.js";

export default function ManageVendorDisplay() {
  const [show, setShow] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };

  const {
    data: vendorDisplays,
    isLoading,
    isError,
    error,
  } = useGetVendorDisplaysQuery();
  const [deleteVendorDisplay, { isLoading: isDeleting }] =
    useDeleteVendorDisplayMutation();

  const handleDeleteDisplay = async (id) => {
    try {
      const res = await deleteVendorDisplay(id).unwrap();
      toast.success("Display deleted successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedDisplay?.name}</Modal.Title>
        </Modal.Header>
        <Image variant="top" src={selectedDisplay?.imageURL} />
        <Modal.Body>{selectedDisplay?.description}</Modal.Body>
        <Modal.Footer>
          {!selectedDisplay?.isSelect && (
            <>
            <Link
              to={`/update-display-item/${selectedDisplay?._id}`}
              className="btn btn-primary"
            >
              Select as Main Display
            </Link>
          <Button
            onClick={() => handleDeleteDisplay(selectedDisplay?._id)}
            variant="danger"
          >
            Delete
          </Button>
          </>
          )}
        </Modal.Footer>
      </Modal>

      <div className="d-flex mt-3">
        <Link to="/add-display-items" className="btn btn-success mb-3">
          Add New Display +
        </Link>
        <h2 className="ms-auto">Manage Your Displays</h2>
        <h4 className="ms-auto">
          Total Displays: {vendorDisplays && vendorDisplays.length}
        </h4>
      </div>
      <Row
        xs={1}
        md={3}
        className="g-4 mt-1"
        style={{ overflow: "auto", maxHeight: "75vh" }}
      >
        {vendorDisplays &&
          vendorDisplays.map((display) => (
            <Col
              key={display._id}
              style={display.isSelect ? { border: "3px solid blue", borderRadius:'10px' } : {}}
              onClick={() => setSelectedDisplay(display)}
            >
              <div onClick={handleShow}>
                <Card>
                  <Card.Img variant="top" src={display.imageURL} />
                  <Card.Body>
                    <Card.Title>{display.name}</Card.Title>
                    <Card.Text>{display.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
}
