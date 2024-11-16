import React from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../slices/adminApiSlice.js";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ManageUser() {

  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDeleteUser = async (id) => {
    console.log(id);
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
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
        <h2 className="ms-auto">Manage Users</h2>
        <h4 className="ms-auto">Total Users: {users.length}</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "admin" &&(
                  <>
                <Link
                  to={`/update-user/${user._id}`}
                  className="btn btn-primary me-2"
                >
                  Update
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
                </>)}
                {user.role === "admin" &&(
                  <p>No Actions</p>)}
                {isLoading && <Loader />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ManageUser;
