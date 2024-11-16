import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';
import { useUpdateItemMutation, useGetItemByIdQuery } from "../slices/itemApiSlice.js";

function UpdateItem() {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [clientID, setClientID] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
    const { data: item, isLoading: isItemLoading } = useGetItemByIdQuery(id);

    useEffect(() => {
        if (item) {
            setCategory(item.category);
            setName(item.name);
            setQuantity(item.quantity);
            setPrice(item.price);
            setImageURL(item.imageURL);
            setClientID(item.clientID); 
        }
    }, [item]);

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const vendorID = userInfo._id;
            const res = await updateItem({id, category, name, quantity, price, imageURL, clientID, vendorID }).unwrap();
            toast.success('Item updated successfully');
            navigate('/get-items');
            window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        setIsLoading(false);
    }

  return (
    <FormContainer>
      <h2>Update Item</h2>
      <Form onSubmit={handleUpdateItem}>
        <Form.Group className='my-2' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="catering">Catering</option>
            <option value="photography">Photography</option>
            <option value="attire">Attire</option>
            <option value="venue">Venue</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='quantity'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='quantity'
            placeholder='Enter quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='price'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='url'
            placeholder='Enter image url'
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='success' className='my-2'>Update Item</Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  )
}

export default UpdateItem