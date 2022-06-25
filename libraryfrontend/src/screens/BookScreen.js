import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listBookDetails, createBookReview} from "../actions/bookActions";
import {BOOK_CREATE_REVIEW_RESET} from "../constants/bookConstants";
import {Button, Card, Col, Image, ListGroup, Row, Form, InputGroup, Modal} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {CurrentDate, LimitDate} from "../components/DatesTimes";
import {GetCategory} from "../components/GetCategoryName";
import {createOrder, addOrdered, listMyOrdered} from "../actions/orderActions";
import Notification from "../components/Notifications";


const proxy = '/static'


function BookScreen() {
    const {id} = useParams();
    const navigate = useNavigate();
    const currentDate = CurrentDate()
    const limitDate = LimitDate()
    const [conf, setConf] = useState(false)


    const [qte, setQte] = useState(1)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const bookDetails = useSelector(state => state.bookDetails)
    const {loading, error, book} = bookDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const bookReviewCreate = useSelector(state => state.bookReviewCreate)
    const {loading: loadingBookReview, error: errorBookReview, success: successBookReview} = bookReviewCreate

    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const createClose = () => setAdd(false);


    if (!book) {
        dispatch(listBookDetails(id))
    }

    useEffect(() => {

        if (successBookReview) {
            setComment('')
            dispatch({type: BOOK_CREATE_REVIEW_RESET})
        }

        dispatch(listBookDetails(id))
    }, [dispatch, id, successBookReview])

    const addToBagBuy = () => {
        navigate(`/bag/${id}?qte=${qte}`)
    }
    const addToBagBorrow = () => {
        navigate(`/bag/${id}?qte=${null}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (comment.match(/[a-z]/i)) {
            dispatch(createBookReview(id, {comment}))
        }
    }

    const createUserHandler = () => {
        setAdd(true);
    }

    const placeOrdered = () => {
        dispatch(addOrdered({
            user: userInfo.id,
            book: book._id,
        }))
        dispatch(listMyOrdered())
        navigate('#')
        setConf(true)
        setAdd(false)

    }


    return (
        <div>
            <Link to="/" className='btn btn-light my-3'
                  style={{border: "solid", marginRight: "-18%", borderColor: "green", color: "green"}}><i
                className="fa fa-undo" aria-hidden="true"> </i> GO Back</Link>


            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <div>
                    <Row>
                        <Col md={6} className='p-5'>
                            <Image src={book.image} alt={book.title} fluid
                                   style={{borderRadius: 30, Height: 850, border:"solid"}}/>
                        </Col>
                        <Col md={6} style={{padding: '2%', textAlign: "center"}}>
                            <Row>
                                <ListGroup variant="flush" style={{width: '80%', margin: "auto"}}>
                                    <ListGroup.Item style={{textAlign: "center"}}>
                                        <Row> <Col><h4>{book.title}</h4></Col> </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row> <Col> Author: </Col> <Col> {book.author} </Col> </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row> <Col> Isbn: </Col> <Col> {book.isbn} </Col> </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row> <Col> Category: </Col> <Col> {book.categoryName} </Col> </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row> <Col> Publication: </Col>
                                            <Col> {book.date_pub ? (book.date_pub.substring(0, 10)) : (book.date_pub)} </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Row>
                            <Row>
                                <ListGroup.Item style={{marginTop: '5%', marginBottom: '5%'}}>
                                    <h5> Description: </h5>  {book.description}
                                </ListGroup.Item>
                            </Row>
                            <Row>
                                <Col>
                                    <Card style={{marginTop: 20, marginLeft: 20}}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item style={{textAlign: "center"}}>
                                                <h5>Borrow </h5>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status: </Col>
                                                    <Col>
                                                        <strong>{book.qte > 0 ?
                                                            <div style={{color: "green"}}>Available</div>
                                                            :
                                                            <div style={{color: "red"}}>Unavailable </div>}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Date: </Col>
                                                    <Col> <strong> {currentDate} </strong> </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {book.qte > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Limit Date: </Col>
                                                        <Col> <strong> {limitDate}  </strong> </Col>
                                                    </Row>
                                                </ListGroup.Item>)}
                                            <ListGroup.Item>
                                                <Row><Button
                                                    onClick={addToBagBorrow}
                                                    className="btn-block"
                                                    disabled={book.qte === 0}
                                                    type="button"
                                                    style={{backgroundColor: "green"}}>
                                                    Add to Bag
                                                </Button>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{marginTop: 20}}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item style={{textAlign: "center"}}>
                                                <h5> Buy</h5>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status: </Col>
                                                    <Col>
                                                        <strong>{book.qte > 0 ?
                                                            <div style={{color: "green"}}>In Stock</div>
                                                            : <div style={{color: "red"}}>Out of
                                                                Stock </div>}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price: </Col>
                                                    <Col> <strong>{book.price} Dh(s)</strong> </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {book.qte > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qte: </Col>
                                                        <Col className="my-1">
                                                            <Form.Control
                                                                as="select" value={qte} onChange={
                                                                (e) => setQte(e.target.value)
                                                            }>{
                                                                [...Array(book.qte).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}
                                                                            style={{textAlign: "center"}}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            {book.qte > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Total Price: </Col>
                                                        <Col> <strong>{(book.price * qte).toFixed(2)} Dh(s)</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Row>
                                                    <Button
                                                        onClick={addToBagBuy}
                                                        className="btn-block"
                                                        disabled={book.qte === 0}
                                                        type="button"
                                                        style={{backgroundColor: "green"}}>
                                                        Add to Bag
                                                    </Button>

                                                </Row>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                {book.qte === 0 && userInfo && (<ListGroup.Item style={{width: '50%', margin: "auto"}}>
                                        <Row><Button
                                            onClick={createUserHandler}
                                            className="btn-block"
                                            disabled={conf}
                                            type="button"
                                            style={{backgroundColor: "green"}}>
                                            {conf ? (<div style={{color: "blue", backgroundColor: "white"}}>Order
                                                Successful</div>) : (<div>Order</div>)}
                                        </Button>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '8%', marginBottom: '8%'}}>
                        <Row style={{margin: "auto", width: '80%'}}>
                            <h5 style={{
                                width: '40%', color: "white", textAlign: "center",
                                margin: "auto", borderRadius: 30
                            }} className='bg-success'>Reviews</h5>

                            {book.reviews && (book.reviews.length === 0 &&
                                <Message variant='info'> No Reviews </Message>)}
                            <ListGroup variant='flush' style={{marginTop: '6%', textAlignLast: "left"}}>
                                {book.reviews && (
                                    (book.reviews).map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <Row>
                                                <Col>
                                                    <strong style={{color: "green"}}>{review.name ? (review.name) : (review.user)}</strong>
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>{review.comment}</p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                )}


                                <ListGroup.Item>
                                    <h4>Write a review:</h4>
                                    {loadingBookReview && <Loader/>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='comment'>
                                                <Form.Control as='textarea' row='5' value={comment}
                                                              onChange={(e) => setComment(e.target.value)}>


                                                </Form.Control>
                                            </Form.Group>
                                            <Button className='my-3 bg-success'
                                                    style={{float: "right", borderRadius: 20}}
                                                    disabled={loadingBookReview}
                                                    type='submit'>
                                                <i className="fas fa-paper-plane fa-1x"></i> Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant='infos'>Please <Link to='/login'>Login</Link> to write a review
                                        </Message>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Row>
                </div>
            )}

            {userInfo ? (
                <Modal show={add} onHide={createClose} animation={true}
                       aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton style={{margin: "auto"}}>
                        <Modal.Title id="contained-modal-title-vcenter">Ordered</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>User:</h5>
                        <Row>
                            <Col>Name: </Col>
                            <Col>{userInfo.name}</Col>
                        </Row>
                        <Row>
                            <Col>Email: </Col>
                            <Col>{userInfo.email}</Col>
                        </Row>
                        <h5>Order: Book</h5>
                        <Row>
                            <Col>Title:</Col>
                            <Col>{book.title}</Col>
                        </Row>
                        <Row>
                            <Col>Author:</Col>
                            <Col>{book.author}</Col>
                        </Row>
                        <Row>
                            <Col>Category:</Col>
                            <Col>{book.categoryName}</Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={createClose} variant='success'
                                style={{float: "left", borderRadius: 10, marginTop: 30}}> Close </Button>
                        <Button onClick={placeOrdered} variant='success'
                                style={{float: "right", borderRadius: 10, marginTop: 30}}> Submit </Button>

                    </Modal.Footer>
                </Modal>

            ) : (
                <Modal show={add} onHide={createClose} animation={true}
                       aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton style={{margin: "auto"}}>
                        <Modal.Title id="contained-modal-title-vcenter">Please Connect...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LinkContainer to='/login'>
                            <Button className='btn-block' style={{backgroundColor: "green"}}>
                                Please Connect...
                            </Button>
                        </LinkContainer>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );

}

export default BookScreen

