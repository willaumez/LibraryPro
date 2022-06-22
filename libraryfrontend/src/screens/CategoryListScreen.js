import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Modal} from "react-bootstrap";
import {deleteCategory, listCategories, listCategoryDetails, updateCategory, createCategory} from "../actions/categoryActions";
import {listBooks} from "../actions/bookActions";


function CategoryListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [bookId, setBookId] = useState(false)

    const categoryList = useSelector(state => state.categoryList)
    const {loading, error, categories} = categoryList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const {success: successDelete} = categoryDelete

    const categoryDetails = useSelector(state => state.categoryDetails)
    const {loading: loadingDetail, error: errorDetail, success: successDetail, category} = categoryDetails
    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = categoryUpdate
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')

    const categoryCreate = useSelector(state => state.categoryCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, category: createCateg} = categoryCreate


    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const handleClose = () => setShow(false);
    const createClose = () => setCreate(false);


    useEffect(() => {
        if (successDelete) {
            dispatch(listCategories())
            navigate(`/admin/?key=categories`)
        } else {
            if (userInfo && userInfo.isAdmin) {
                dispatch(listCategories())
                if (category.nom) {
                    setNom(category.nom)
                    setDescription(category.description)
                } else {
                    dispatch(listCategories())

                }

            } else {
                navigate('/login')
            }
        }
    }, [category.description, category.nom, dispatch, navigate, successDelete, userInfo])


    const submitCreateHandler = (e) => {
        e.preventDefault()
        dispatch(createCategory({nom, description}))
        dispatch(listCategories())
        setCreate(false)
    }

    const createBookHandler = () => {
        setNom('')
        setDescription('')
        setCreate(true);
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this category ?')) {
            dispatch(deleteCategory(id))
            dispatch(listBooks(''))
        }
    }
    let editHandler = (id) => {
        dispatch(listCategoryDetails(id))
        setShow(true);
        setBookId(id)
        setNom(category.nom)
        setDescription(category.description)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory({_id: bookId, nom, description}))
        setShow(false)
    }


    return (
        <div>
            <Row className='align-items-center'>
                <Col className='text-center'>
                    <Button className='my-3 bg-success' style={{float: "right", borderRadius: 20}}
                            onClick={createBookHandler}>
                        <i className="fas fa-plus"></i> Create Category
                    </Button>
                </Col>
            </Row>

            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {errorDetail && <Message variant='danger'>{errorDetail}</Message>}

            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
                <div className='overflow-scroll'>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead style={{textAlign: "center"}}>
                    <tr>
                        <th>NAME</th>
                        <th>DATE-CREATE</th>
                        <th>DESCRIPTION</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "center"}}>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.nom}</td>
                            <td>{category.dateCreate.substring(0, 10)}</td>
                            <td>{category.description}</td>
                            <td>
                                <Button variant='light' className='btn-sm' onClick={() => editHandler(category._id)}>
                                    <i className='fas fa-edit fa-2x'></i>
                                </Button>
                            </td>
                            <td>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category._id)}>
                                    <i className='far fa-trash-alt fa-2x'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                    {categories.length === 0 && <Message variant='info'>Categories list is empty </Message> }
                </div>
            )}

            <Modal show={show} onHide={handleClose} animation={true} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{margin: "auto"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {loadingDetail ? <Loader/> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Form.Group className="mb-4" controlId='nom'>
                                    <Form.Label>Title: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter name'
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-4" controlId='description'>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>

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
                    <Modal.Title id="contained-modal-title-vcenter">Create Category</Modal.Title>
                </Modal.Header>

                {loadingCreate && <Loader/>}
                <Modal.Body>
                    {loadingDetail ? <Loader/> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
                        <Form onSubmit={submitCreateHandler}>
                            <Row>
                                <Form.Group className="mb-4" controlId='nom'>
                                    <Form.Label>Title: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter name'
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-4" controlId='description'>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                        type='name' placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>

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

export default CategoryListScreen