import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Col, Row} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listBorrows, deleteBorrow } from "../actions/orderActions";
import Notification from "../components/Notifications";


function BorrowListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const borrowList = useSelector(state => state.borrowList)
    const { loading, error, borrows } = borrowList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const borrowDelete = useSelector(state => state.borrowDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = borrowDelete


    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
           dispatch(listBorrows())
        }else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this book ?')){
            dispatch(deleteBorrow(id))
            navigate(`/admin/?key=borrowing`)
            window.location.reload();
        }
    }

    return(
        <div>

            {loadingDelete && <Loader/>}
            {successDelete && <Notification variant='success' message='Delete Borrowing Success'/>}

            {errorDelete && <Notification variant='danger' message={errorDelete}/>}
            {error && <Notification variant='danger' message={error}/>}

            {loading ? (<Loader />) : error ? (<Notification variant='danger' message={error}/>) : (
                <div style={{overflow:'auto', height:'75vh'}}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead style={{tableLayout:"fixed", textAlign:"center", position:"sticky"}}>
                        <tr>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>CODE</th>
                            <th>TAKE</th>
                            <th>RETURN</th>
                        </tr>
                    </thead>
                    <tbody style={{overflow:'auto', textAlign:"center"}}>
                        {borrows.map(borrow => (
                            <tr key={borrow._id}>
                                <td>{borrow.user && borrow.user.name}</td>
                                <td>{borrow.BorrowAt.substring(0, 10)}</td>
                                <td>{borrow.codeVer}</td>
                                <td>{borrow.isTake ? (
                                    borrow.takeAt.substring(0, 10)) : (
                                        <i className='fas fa-check' style={{color:"red"}}></i>
                                    )}
                                </td>
                                <td>{borrow.isReturn ? (
                                    borrow.returnAt.substring(0, 10)) : (
                                        <i className='fas fa-check' style={{color:"red"}}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/borrow/${borrow._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fas fa-info fa-2x"></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(borrow._id)}>
                                        <i className='far fa-trash-alt fa-2x'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                     {borrows.length === 0 && <Message variant='info'> The list of borrowings is empty </Message>}
                </div>
            )}


        </div>
    )
}

export default BorrowListScreen


