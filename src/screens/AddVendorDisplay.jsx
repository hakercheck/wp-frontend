import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddVendorDisplayMutation,
  useGetVendorDisplaysQuery,
} from "../slices/vendorDisplayApiSlice.js";

export default function AddVendorDisplay() {
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [addVendorDisplay, { isLoading: isAdding }] =
    useAddVendorDisplayMutation();
  const { data: vendorDisplays, refetch } = useGetVendorDisplaysQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  const handleAddVendorDisplay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const vendorID = userInfo._id;
      const currentVendorDisplays = vendorDisplays.filter(
        (display) => display.vendorID === vendorID
      );
      const isSelect = currentVendorDisplays.length === 0;
      const res = await addVendorDisplay({
        imageURL,
        name,
        description,
        vendorID,
        isSelect,
      }).unwrap();

      try {
        console.log("Before refetch");
        await refetch();
      } catch (err) {
        console.log("Error in refetch", err);
      }

      toast.success("Vendor Display added successfully");
      navigate("/get-display-items");
      window.location.reload();
    } catch (err) {
      console.log("Error occurred", err);
      toast.error(err?.data?.message || err.error);
    }
    setIsLoading(false);
  };

  return (
    <FormContainer>
      <h1>Add Vendor Display</h1>
      <Form onSubmit={handleAddVendorDisplay}>
        <Form.Group className="my-2" controlId="imageURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="success" className="my-2">
          Add Display
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
}
