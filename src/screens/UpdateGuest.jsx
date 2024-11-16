import React,{useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateGuestMutation, useGetGuestByIdQuery } from '../slices/guestsApiSlice';
import { toast } from 'react-toastify';

function UpdateGuest() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateGuest, { isLoading: isUpdating }] = useUpdateGuestMutation();
    const { data: guest, isLoading: isGuestLoading } = useGetGuestByIdQuery(id);

    useEffect(() => {
        if (guest) {
            setName(guest.name);
            setContact(guest.contact);
            setAddress(guest.address);
        }
    }, [guest]);

    const handleUpdateGuest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const clientID = userInfo._id;
            const res = await updateGuest({id, name, contact, address, clientID }).unwrap();
            toast.success('Guest updated successfully');
            navigate('/get-guests');
            window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        setIsLoading(false);
    }

  return (
    <FormContainer>
      <h1>Update Guest</h1>
      <Form onSubmit={handleUpdateGuest}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='contact'>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type='contact'
            placeholder="Enter Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button onClick={handleUpdateGuest} type='submit' variant='success' className='mt-3'>
          Update Details
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  )
}

export default UpdateGuest