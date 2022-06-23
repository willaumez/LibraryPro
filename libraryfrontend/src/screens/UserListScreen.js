import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser, getUserDetails, updateUser, createUser, signup,} from "../actions/userActions";
import {USER_UPDATE_RESET, USER_CREATE_RESET,} from "../constants/userConstants";
import {Modal} from "react-bootstrap";

function UserListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [nameCreate, setNameCreate] = useState('')
    const [emailCreate, setEmailCreate] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isStaff, setIsStaff] = useState(false)
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state => state.userDetails)
    const {error: errorDetails, loading: loadingDetail, user} = userDetails
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    const userCreate = useSelector(state => state.userCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate, user: userCreat} = userCreate

    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const handleClose = () => setShow(false);
    const createClose = () => setCreate(false);
    const [userId, setUserId] = useState(false)


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            if (userId) {
                if (successUpdate) {
                    dispatch({type: USER_UPDATE_RESET})
                    navigate('/admin')
                } else {
                    if (!user.name || user._id !== Number(userId)) {
                        dispatch(getUserDetails(userId))
                    } else {
                        setName(user.name)
                        setEmail(user.email)
                        setIsAdmin(user.isAdmin)
                    }
                }
            }
            if (successCreate) {
                navigate(`/admin/?key=users`)
            }
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate, successDelete, userId, user, successUpdate, successCreate])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user ?')) {
            dispatch(deleteUser(id))
        }
    }
    let editHandler = (id) => {
        setShow(true);
        setUserId(id);
    }

    const createUserHandler = () => {
        setCreate(true);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
        setShow(false)
    }

    const submitCreateHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match ')
        } else {
            dispatch(createUser(nameCreate, emailCreate, password, isStaff))
            setMessage('')
            setCreate(false)
            setNameCreate('');
            setEmailCreate('');
            setPassword('');
            setConfirmPassword('');
            setIsStaff(false);
        }
    }


    return (
        <div>
            {message && <Message variant='danger'>{message}</Message>}
            {loadingUpdate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
             {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            <Row className='align-items-center'>
                <Col className='text-center'>
                    <Button className='my-3 bg-success' style={{float: "right", borderRadius: 20}}
                            onClick={createUserHandler}>
                        <i className="fas fa-plus"></i> Create User
                    </Button>
                </Col>
            </Row>

            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
                <div style={{overflow:'auto', height:'75vh'}}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead style={{tableLayout:"fixed", textAlign:"center", position:"sticky"}}>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                        </tr>
                        </thead>
                        <tbody style={{overflow:'auto', textAlign:"center"}}>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: "green"}}></i>) : (
                                    <i className='fas fa-check' style={{color: "red"}}></i>
                                )}
                                </td>
                                <td>
                                    <Button variant='light' className='btn-sm' onClick={() => {
                                        editHandler(user._id)
                                    }}>
                                        <i className='fas fa-edit fa-2x'></i>
                                    </Button>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='far fa-trash-alt fa-2x'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {users.length === 0 && <Message variant='info'>Users list is empty </Message>}
                </div>
            )}

            <Modal show={show} onHide={handleClose} animation={true} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{margin: "auto"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {loadingDetail ? <Loader/> : errorDetails ? <Message variant='danger'>{errorDetails}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-4" controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name' placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email' placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            {userInfo.id !== userId ? (
                                <Form.Group className="mb-4" controlId='isAdmin'>
                                    <Form.Check
                                        type='checkbox' label='isAdmin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>
                            ):(
                                <div style={{textAlign:"center", color:"green"}}>You are the administrator currently logged in...</div>
                            )}


                            <Button type='submit' variant='success'
                                    style={{float: "right", borderRadius: 10, marginTop: 30}}> Update </Button>
                            <Button onClick={handleClose} variant='success'
                                    style={{float: "left", borderRadius: 10, marginTop: 30}}> Close </Button>

                        </Form>
                    )}


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            <Modal show={create} onHide={createClose} animation={true} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{margin: "auto"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingCreate ? <Loader/> : (
                        <Form onSubmit={submitCreateHandler}>
                            <Form.Group className="mb-4" controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name' placeholder='Enter name'
                                    value={nameCreate}
                                    onChange={(e) => setNameCreate(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email' placeholder='Enter Email'
                                    value={emailCreate}
                                    onChange={(e) => setEmailCreate(e.target.value)}>
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
                            <Form.Group className="mb-4" controlId='isAdmin'>
                                <Form.Check
                                    type='checkbox' label='isAdmin'
                                    checked={isStaff}
                                    onChange={(e) => setIsStaff(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='success'
                                    style={{float: "right", borderRadius: 10, marginTop: 30}}> Create </Button>
                            <Button onClick={createClose} variant='success'
                                    style={{float: "left", borderRadius: 10, marginTop: 30}}> Close </Button>

                        </Form>
                    )}

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default UserListScreen


