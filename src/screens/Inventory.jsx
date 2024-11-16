import React from "react";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
} from "../slices/itemApiSlice.js";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Inventory() {
  const { data: items, isLoading, isError, error } = useGetItemsQuery();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteItem(id).unwrap();
      toast.success("Item deleted successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="d-flex mt-5">
        <Link to="/add-item" className="btn btn-success mb-2">
          Add Item +
        </Link>
        <h2 className="ms-auto">Manage Inventory</h2>
        <h4 className="ms-auto">Total Items: {items.length}</h4>
      </div>
      <div style={{ overflow: "auto", maxHeight: "75vh" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <Link
                    to={`/update-item/${item._id}`}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                  {isLoading && <Loader />}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Inventory;
