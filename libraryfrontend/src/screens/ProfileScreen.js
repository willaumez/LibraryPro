import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col, Tab, Tabs, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders, listMyBorrows, listMyOrdered} from "../actions/orderActions";
import Notification from "../components/Notifications";
import {toast} from "react-toastify";


function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    const orderedListMy = useSelector(state => state.orderedListMy)
    const {loading: loadingOrdered, error: errorOrdered, ordered} = orderedListMy

    const borrowListMy = useSelector(state => state.borrowListMy)
    const {loading: loadingBorrows, error: errorBorrows, borrows} = borrowListMy


    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                dispatch(listMyBorrows())
                dispatch(listMyOrdered())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match ')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }
    if (message){
        const toastId = toast.warning(`${message}`)
        setMessage('')
    }

    return (<div style={{marginBottom: '10%'}}>
            <Tabs fill defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" style={{margin: 20}}>
                <Tab eventKey="profile" title="PROFILE" className='py-3' style={{borderColor: "blue"}}>
                    <h2>Update User Profile</h2>

                    {loading && <Loader/>}

                    <Col md={6} style={{margin: "auto"}}>

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
                                    type='password' placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId='passwordConfirm'>
                                <Form.Control
                                    type='password' placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='success'
                                    style={{borderRadius: 10, float: "right"}}> Update </Button>
                        </Form>
                    </Col>
                </Tab>

                <Tab eventKey="buying" title="BUYINGS">
                    <h2 style={{marginTop: '3%'}}>My Orders </h2>
                    {loadingOrders ? (<Loader/>) : errorOrders ? (<Message variant='danger'>{errorOrders}</Message>) : (
                        <div>
                        <Table striped responsive className='table-sm' style={{marginTop: '2%'}}>
                            <thead style={{textAlign: "center"}}>
                            <tr>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                            </thead>
                            <tbody style={{textAlign: "center"}}>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice} dhs</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: "red"}}/>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                        <button type="button" className="btn btn-outline-success btn-sm">Details
                                        </button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                            {orders.length === 0 && <Message variant='info'> Your purchases are empty </Message> }

                        </div>
                    )}
                </Tab>

                <Tab eventKey="borrows" title="BORROWINGS">
                    <h2 style={{marginTop: '3%'}}>My Borrows </h2>
                    {loadingBorrows ? (<Loader/>) : errorBorrows ? (
                        <Message variant='danger'>{errorBorrows}</Message>) : (<div>
                        <Table striped responsive className='table-sm' style={{marginTop: '2%'}}>
                            <thead style={{textAlign: "center"}}>
                            <tr>
                                <th>Date</th>
                                <th>Limit</th>
                                <th>Take</th>
                                <th>Return</th>
                            </tr>
                            </thead>
                            <tbody style={{textAlign: "center"}}>
                            {borrows.map(borrow => (
                                <tr key={borrow._id}>
                                    <td>{borrow.dateBor.substring(0, 10)}</td>
                                    <td>{borrow.dateLimit.substring(0, 10)}</td>
                                    <td>{borrow.isTake ? borrow.takeAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: "red"}}/>)}</td>
                                    <td><LinkContainer to={`/borrow/${borrow._id}`}>
                                        <button type="button" className="btn btn-outline-success btn-sm">Details
                                        </button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                             {borrows.length === 0 && <Message variant='info'> Your loans are empty </Message> }
                        </div>
                    )}
                </Tab>

                <Tab eventKey="orders" title="ORDERS">
                    <h2 style={{marginTop: '3%'}}>My Orders </h2>
                    {loadingOrdered ? (<Loader/>) : errorOrdered ? (
                        <Message variant='danger'>{errorOrdered}</Message>) : (<div>
                        <Table striped responsive className='table-sm' style={{marginTop: '2%'}}>
                            <thead style={{textAlign: "center"}}>
                            <tr>
                                <th>User-Name</th>
                                <th>User-Email</th>
                                <th>Book-Title</th>
                                <th>Book-Author</th>
                                <th>Date-Order</th>
                            </tr>
                            </thead>
                            <tbody style={{textAlign: "center"}}>

                            {ordered.map(order => (
                                <tr key={order._id}>
                                    <td>{order.userName}</td>
                                    <td>{order.userEmail}</td>
                                    <td>{order.bookTitle}</td>
                                    <td>{order.bookAuthor}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                         {ordered.length === 0 && <Message variant='info'>Your orders are empty </Message> }
                        </div>
                    )}
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProfileScreen