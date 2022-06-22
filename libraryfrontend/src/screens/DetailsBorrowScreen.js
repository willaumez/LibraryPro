import React, {useState,useEffect} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getBorrowDetails, listMyBorrows, takeBorrow, returnBorrow} from "../actions/orderActions";
import { BORROW_TAKE_RESET, BORROW_RETURN_RESET  } from "../constants/orderConstants";

const proxy = '/static'


function DetailsBorrowScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const borrowDetails = useSelector(state => state.borrowDetails)
    const { borrow, error, loading } = borrowDetails

    const borrowTake = useSelector(state => state.borrowTake)
    const { loading: loadingTake, success: successTake } = borrowTake

    const borrowReturn = useSelector(state => state.borrowReturn)
    const { loading: loadingReturn , success: successReturn } = borrowReturn

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
         if (!userInfo){ navigate('/login') }

        if (!borrow || borrow._id !== Number(id) || successTake || successReturn){
            dispatch(getBorrowDetails(id))
            dispatch(listMyBorrows())
            dispatch({type: BORROW_TAKE_RESET})
            dispatch({type: BORROW_RETURN_RESET})
        }
    },[borrow, id, dispatch, successTake, successReturn, userInfo, navigate])

    const takeHandler = () => {
        dispatch(takeBorrow(borrow))
    }
    const returnHandler = () => {
        dispatch(returnBorrow(borrow))
    }


    return loading ? ( <Loader/> ) : error ? ( <Message variant='danger'>{error}</Message> ): (
        <div style={{marginBottom:'8%'}}>  <h1> Borrow:  {borrow._id} </h1>
            <Row>
                    <Col>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                                <p>
                                    <strong>Shipping: </strong>
                                    {borrow.borrowAddress.address}, {"    "}   {borrow.borrowAddress.city},
                                    {"    "}{borrow.borrowAddress.postalCode}
                                    {"    "}{borrow.borrowAddress.country}
                                </p>
                        </ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item>
                            <h4> User :  {borrow.user.name}</h4>
                            <p> <strong> Email: </strong> <a href={`mailto:${borrow.user.email}`}>{borrow.user.email}</a> </p>
                        </ListGroup.Item>
                    </Col>
            </Row>
            <Row>
                <Col>
                    {borrow.isTake ? (
                        <Message variant='success' cl> Yes, it's taken : {borrow.takeAt.substring(0, 10)} </Message>
                    ):(  <Message variant='warning'> No, it's not taken  </Message>  )}
                </Col>
                <Col>
                    <Message variant='success'> Verification code :  {borrow.codeVer} </Message>
                </Col>
            </Row>
            {userInfo.isAdmin && (
            <Row>
                <Col>{ loadingTake && <Loader /> }
                    {userInfo && userInfo.isAdmin && !borrow.isTake && !borrow.isReturn &&(
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block bg-success'  style={{borderRadius:20}} onClick={takeHandler}>
                                Mark as Taken
                            </Button>
                        </ListGroup.Item>
                     )}
                </Col>
                <Col>{ loadingReturn && <Loader /> }
                    {userInfo && userInfo.isAdmin && borrow.isTake && !borrow.isReturn &&(
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block bg-success'  style={{borderRadius:20}} onClick={returnHandler}>
                                Mark as Return
                            </Button>
                        </ListGroup.Item>
                    )}
                </Col>

            </Row>)}
            <Row style={{padding:'6%'}}>
                    <h3>Items Selected</h3>
                <ListGroup variant='flush' style={{width:'80%', margin:"auto"}}>
                        <ListGroup.Item>
                            {borrow.borrowItems.length === 0 ? <Message variant='info'>
                                Your borrow is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {borrow.borrowItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row style={{textAlign:"center"}}>
                                                <Col md={2}>
                                                    <Image src={`${proxy}${item.image}`} alt={item.title} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book}`} className="titre py-0">{item.title}</Link>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
            </Row>
             <Row>
                 <Card  style={{ width:'70%', margin:"auto"}}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3 className='text-center'>Borrow Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:  </Col>
                                    <Col>{borrow.borrowItems.length} item(s)</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Current Date:  </Col>
                                    <Col>{ borrow.dateBor.substring(0, 10)} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Limit Date:  </Col>
                                    <Col>{ borrow.dateLimit.substring(0, 10)} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>
                                    {borrow.isReturn ? (
                                        <Message variant='success'> Yes it's back :  {borrow.returnAt.substring(0, 10)} </Message>
                                    ) : (
                                        <Message variant='warning'> No it's not going back </Message>
                                    )}
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
            </Row>
        </div>
    )
}

export default DetailsBorrowScreen