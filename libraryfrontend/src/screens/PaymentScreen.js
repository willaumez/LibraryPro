import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {savePaymentMethod} from "../actions/bagActions";
import BuySteps from "../components/BuySteps";


function PaymentScreen() {
    const navigate = useNavigate();

    const bag = useSelector(state => state.bagBuy)
    const {shippingAddress} = bag

    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div><BuySteps step1 step2 step3/>
            <FormContainer>
                <Form onSubmit={submitHandler} style={{marginTop: 50}}>
                    <Form.Group>
                        <Form.Label as='legend'> Select Method</Form.Label>
                        <Col>
                            <Form.Check type='radio'
                                        label='PayPal or Credit Card'
                                        id='paypal'
                                        name='paymentMethod'
                                        checked onChange={(e) => setPaymentMethod(e.target.value)}>
                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='success'
                            style={{float: "right", borderRadius: 10}}> Continue </Button>
                </Form>
            </FormContainer>
        </div>
    )

}

export default PaymentScreen

