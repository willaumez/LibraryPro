import React, {useState,useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/bagActions";
import BorrowSteps from "../components/BorrowSteps";


function BorrowsScreen() {

    const bag = useSelector(state => state.bagBorrow)
    const { shippingAddress } = bag

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
      e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country,}))
        navigate('/confirm')
    }

    return(
        <div>
            <BorrowSteps step1 step2/>
            <h1>To Borrow</h1>
        <FormContainer>
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-4" controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text' placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text' placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type='text' placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text' placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='success' style={{float:"right", borderRadius:10}}> Confirm </Button>
            </Form>
        </FormContainer></div>
    )

}

export default BorrowsScreen