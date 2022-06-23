import React, {useState,useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {login, signup} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Notification from "../components/Notifications";

function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const redirect = (useLocation().search ? useLocation().search.split('=')[1] : '/')
    const navigate = useNavigate();

    const userSignUp = useSelector(state => state.userSignUp)
    const {error, loading, userInfo} = userSignUp


    useEffect(() => {
        if (userInfo){
            navigate(redirect);
        }
    },[navigate, userInfo, redirect])



    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match ')
        }else {
             dispatch(signup(name, email, password))
            setMessage('')
        }
    }


    return(
        <FormContainer>
            <h1 style={{marginTop:'5%'}}>Sign Up</h1>
            {message && <Notification variant='warning' message={message}/>}

            {error && <Notification variant='danger' message={error}/>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name' placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email' placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password' placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId='passwordConfirm'>
                    <Form.Control
                        required
                        type='password' placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='success' style={{float:"right", borderRadius:10}}> Sign Up </Button>

            </Form>

            <Row className='py-3'>
                    Have an Account? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }> Sign In</Link>
            </Row>

        </FormContainer>
    )
    
}

export default SignUpScreen