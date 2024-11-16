import React from "react";
import {
  useGetGuestsQuery,
  useDeleteGuestMutation,
} from "../slices/guestsApiSlice";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from '../components/Loader';

function ManageGuest() {
  const { data: guests, isLoading, isError, error } = useGetGuestsQuery();
  const [deleteGuest, { isLoading: isDeleting }] = useDeleteGuestMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteGuest(id).unwrap();
      toast.success("Guest deleted successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="d-flex mt-5">
        <Link to="/add-guests"
          className="btn btn-success mb-2"
        >
          Add Guest +
        </Link>
        <h2 className="ms-auto">Manage Guests</h2>
        <h4 className="ms-auto">Total Guests: {guests.length}</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ overflow: "auto", maxHeight: "75vh" }}>
          {guests.map((guest) => (
            <tr key={guest._id}>
              <td>{guest.name}</td>
              <td>{guest.contact}</td>
              <td>{guest.address}</td>
              <td>
                <Link
                  to={`/update-guest/${guest._id}`}
                  className="btn btn-primary me-2"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(guest._id)}
                >
                  Delete
                </Button>
                {isLoading && <Loader />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ManageGuest;
