import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Modal, Image } from "react-bootstrap";
import {
  useGetVendorDisplaysForClientQuery,
  useGetVendorSelectionsQuery,
  useRemoveDuplicatesMutation,
} from "../slices/vendorSelectApiSlice.js";
import { useSelector } from "react-redux";

export default function VendorSelection() {
  console.log("VendorSelection rendered");

  const [show, setShow] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: vendorDisplays,
    isLoading,
    isError,
    error,
  } = useGetVendorDisplaysForClientQuery();
  const {
    data: vendorSelections,
    isLoading: isVendorSelectionsLoading,
    isError: isVendorSelectionsError,
    error: vendorSelectionsError,
    refetch: refetchVendorSelections,
  } = useGetVendorSelectionsQuery();

  const [removeDuplicates] = useRemoveDuplicatesMutation();
  useEffect(() => {
    if (vendorSelections) {
      removeDuplicates()
        .unwrap()
        .then(() => console.log("Duplicates removed"))
        .catch((error) => console.error(error));
    }
  }, [removeDuplicates, vendorSelections]);

  const clientID = userInfo._id;
  const vendorSelection =
    vendorSelections &&
    vendorSelections.find(
      (selection) =>
        selection &&
        selection.clientIDs &&
        selection.clientIDs.includes(clientID)
    );

  let isSelected = false;
  if (vendorSelections && selectedDisplay) {
    const vendorSelection2 = vendorSelections.find(
      (selection) => selection.vendorID === selectedDisplay.vendorID
    );
    if (vendorSelection2 && vendorSelection2.clientIDs) {
      isSelected =
        vendorSelection2.clientIDs.find(
          (client) => client.clientID === clientID
        ) !== undefined;
    }
  }

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
          {!isSelected && (
            <Link
              to={`/update-vendor-select/${selectedDisplay?.vendorID}/${clientID}`}
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Select as Main Vendor
            </Link>
          )}
          {isSelected && (
            <Link
              to={`/item-selection/${selectedDisplay?.vendorID}`}
              className="btn btn-primary"
            >
              Purchase Goods now
            </Link>
          )}
        </Modal.Footer>
      </Modal>

      <div className="d-flex mt-3">
        <h2 className="ms-auto">Select your Vendor</h2>
        <h4 className="ms-auto">
          Total Vendors:{" "}
          {vendorDisplays &&
            vendorDisplays.filter((display) => display.isSelect).length}
        </h4>
      </div>
      <Row
        xs={1}
        md={3}
        className="g-4 mt-1"
        style={{ overflow: "auto", maxHeight: "75vh" }}
      >
        {vendorDisplays &&
          vendorDisplays.map((display) => {
            let isSelected = false;
            if (vendorSelections) {
              const vendorSelection2 = vendorSelections.find(
                (selection) => selection.vendorID === display.vendorID
              );
              if (vendorSelection2 && vendorSelection2.clientIDs) {
                isSelected =
                  vendorSelection2.clientIDs.find(
                    (client) => client.clientID === clientID
                  ) !== undefined;
              }
            }

            return (
              <Col
                key={display._id}
                style={
                  isSelected
                    ? { border: "3px solid blue", borderRadius: "10px" }
                    : {}
                }
                onClick={(e) => {
                  if (e.target.tagName.toLowerCase() !== "a") {
                    setSelectedDisplay(display);
                    if (selectedDisplay !== display) {
                      handleShow();
                    }
                  }
                }}
              >
                <Card>
                  <Card.Img variant="top" src={display.imageURL} />
                  <Card.Body>
                    <Card.Title>{display.name}</Card.Title>
                    <Card.Text>{display.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
