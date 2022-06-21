import React, {useState,useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const redirect = (useLocation().search ? useLocation().search.split('=')[1] : '/')
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin


    useEffect(() => {
        if (userInfo){
            navigate(redirect);
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return(
        <FormContainer>
            <h1 style={{marginTop:'5%'}}>Login</h1>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='success' style={{float:"right", borderRadius:10}}> Sign In </Button>
            </Form>
            <Row className='py-4'>
                <Col>
                    New Customer <Link to={ redirect ? `/signup?redirect=${redirect}` : '/signup' }> Sign Up</Link>
                </Col>
            </Row>


        </FormContainer>
    )
    
}

export default LoginScreen