import React, {useState,useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveConfirmBorrow } from "../actions/bagActions";
import BorrowSteps from "../components/BorrowSteps";

function ConfirmScreen() {
    const navigate = useNavigate();

    const bag = useSelector(state => state.bagBorrow)
    const { shippingAddress } = bag

    const dispatch = useDispatch()
    const [confirmMethod, setConfirmMethod] = useState('Confirm')

    if (!shippingAddress.address){
        navigate('/borrows')
    }

    const submitHandlerConfirm = (e) => {
        e.preventDefault()
        dispatch(saveConfirmBorrow(confirmMethod))
        navigate('/placeborrow')
    }

    return(
        <div><BorrowSteps step1 step2 step3/>
        <FormContainer>
            <Form onSubmit={submitHandlerConfirm} style={{marginTop:50}}>
                <Form.Group>
                    <Form.Label as='legend'> Confirm Process...</Form.Label>
                    <Col>
                        <Form.Check type='radio'
                                    label='Confirm...'
                                    id='Confirm'
                                    name='confirmMethod'
                                    checked onChange={(e) => setConfirmMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='success'  style={{float:"right", borderRadius:10}}> Valid </Button>
            </Form>

        </FormContainer></div>
    )

}

export default ConfirmScreen

