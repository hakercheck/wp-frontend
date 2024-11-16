import React,{useState,useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddGuestMutation } from '../slices/guestsApiSlice';
import { toast } from 'react-toastify';

function AddGuest() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo]);

    const [addGuest, { isLoading: isAdding }] = useAddGuestMutation();

    const handleAddGuest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const clientID = userInfo._id;
            const res = await addGuest({ name, contact, address, clientID }).unwrap();
            toast.success('Guest added successfully');
            navigate('/get-guests');
            window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        setIsLoading(false);
    }

  return (
    <FormContainer>
      <h1>Add Guest</h1>
      <Form onSubmit={handleAddGuest}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='contact'>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type='contact'
            placeholder='Enter contact'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='success' className='mt-3'>
          Add Guest
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  )
}

export default AddGuest