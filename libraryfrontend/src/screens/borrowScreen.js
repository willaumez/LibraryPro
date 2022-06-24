import React, {useEffect} from "react";
import {Link, useLocation, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CurrentDate, LimitDate} from "../components/DatesTimes";
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import Message from "../components/Message";
import {addToBorrowBag, removeFromBagBorrow} from "../actions/bagActions";
import {LinkContainer} from "react-router-bootstrap";

function BorrowScreen({book_id, qte}) {


    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (qte === 'null') {
        qte = null
    }


    const bagBorrow = useSelector(state => state.bagBorrow)
    const {bagBorrowItems} = bagBorrow

    useEffect(() => {
        if (qte === null) {
            dispatch(addToBorrowBag(book_id))
        }
    }, [dispatch, book_id, qte])


    const removeBagBorrow = (id) => {
        dispatch(removeFromBagBorrow(id))
    }
    const checkoutBuy = () => {
        navigate(`/borrows`)
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Borrow Bag</h1>
                {bagBorrowItems.length === 0 ? (
                    <Message variant='success'>
                        Your bag Borrow is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {bagBorrowItems.map(item => (
                            <ListGroup.Item key={item.book}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.title} fluid rounded/>
                                    </Col>
                                    <Col md={3} className="overflow-scroll">
                                        <Link to={`/book/${item.book}`} className="titre">{item.title}</Link>
                                    </Col>
                                    <Col md={2}> {item.currentDate} </Col>
                                    <Col md={2}> {item.limitDate} </Col>
                                    <Col md={2}> </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='outline-dark'
                                            onClick={() => removeBagBorrow(item.book)}
                                            style={{borderRadius: 20}}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>

                                        </Button>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SubTotal ({bagBorrowItems.length}) item(s)</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row><Col> Current Date </Col> <Col> {CurrentDate()} </Col> </Row>
                            {bagBorrowItems.length !== 0 ? (
                                <Row><Col> Limit Date </Col> <Col> {LimitDate()} </Col> </Row>) : (<span/>)}


                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        {userInfo ? (
                            <Button type='button' className='btn-block'
                                    style={{width: '100%', backgroundColor: "green", margin: "auto"}}
                                    disabled={bagBorrowItems.length === 0}
                                    onClick={checkoutBuy}>
                                Proceed To Borrow
                            </Button>
                        ) : (
                            <LinkContainer to='/login' style={{width: '100%', margin: "auto"}}>
                                <Button type='button' className='btn-block bg-success'>
                                    Please Connect...
                                </Button>
                            </LinkContainer>
                        )}

                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>

    )

}

export default BorrowScreen