import React, {useEffect} from "react";
import {Link, useLocation, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {addToBuyBag, removeFromBagBuy} from "../actions/bagActions";
import {LinkContainer} from "react-router-bootstrap";


const proxy = 'http://localhost:8000'


function BuyScreen({book_id, qte}) {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const bagBuy = useSelector(state => state.bagBuy)
    const {bagBuyItems} = bagBuy

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!Number(qte)) {
        qte = null
    }


    useEffect(() => {
        if (qte !== null) {
            dispatch(addToBuyBag(book_id, qte))
        }
    }, [dispatch, book_id, qte])


    const removeBagBuy = (id) => {
        dispatch(removeFromBagBuy(id))
    }

    const checkoutBuy = () => {
        navigate('/shipping')
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Shipping Bag</h1>
                {bagBuyItems.length === 0 ? (
                    <Message variant='success'>
                        Your bag Buy is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {bagBuyItems.map(item => (
                            <ListGroup.Item key={item.book}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={`${proxy}${item.image}`} alt={item.title} fluid rounded/>
                                    </Col>
                                    <Col md={3} className="overflow-scroll">
                                        <Link to={`/book/${item.book}`} className="titre">{item.title}</Link>
                                    </Col>
                                    <Col md={3} className="overflow-auto">
                                        {item.price * item.qteSel} Dh(s)
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select" value={item.qteSel} onChange={
                                            (e) => dispatch(addToBuyBag(item.book, Number(e.target.value)))
                                        }>{
                                            [...Array(item.qte).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1} style={{textAlign: "center"}}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='outline-dark'
                                            onClick={() => removeBagBuy(item.book)}
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
                            <h2>SubTotal {bagBuyItems.reduce((acc, item) => (Number(acc) + Number(item.qteSel)), 0)} item(s)</h2>
                            <h4 style={{color: "green"}}>{bagBuyItems.reduce((acc, item) => (acc + (item.qteSel * item.price)), 0).toFixed(2)} Dh(s)</h4>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        {userInfo ? (
                            <Button type='button' className='btn-block'
                                    style={{width: '100%', backgroundColor: "green", margin: "auto"}}
                                    disabled={bagBuyItems.length === 0}
                                    onClick={checkoutBuy}
                            >
                                Proceed To Checkout
                            </Button>
                        ) : (
                            <LinkContainer to='/login' style={{width: '100%', margin: "auto"}}>
                                <Button type='button' className='btn-block bg-success'
                                        >
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

export default BuyScreen