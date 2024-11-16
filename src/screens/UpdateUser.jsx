import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserByAdminMutation,
} from "../slices/adminApiSlice.js";
import { toast } from "react-toastify";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateUserByAdmin, { isLoading: isUpdating }] =
    useUpdateUserByAdminMutation();
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateUserByAdmin({id:user._id, name, email, role }).unwrap();
      toast.success("User updated successfully");
      navigate("/manage-users");
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setIsLoading(false);
  };

  return (
    <FormContainer>
      <h1>Update User</h1>
      <Form onSubmit={handleUpdateUser}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            readOnly
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
}

export default UpdateUser;
