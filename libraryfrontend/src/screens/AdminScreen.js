import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col, Tab, Tabs, Table, Nav} from "react-bootstrap";

import UserListScreen from "./UserListScreen";
import BookListScreen from "./BookListScreen";
import BuyingListScreen from "./BuyingsListScreen";
import BorrowListScreen from "./BorrowListScreen";
import CategoryListScreen from "./CategoryListScreen";
import OrderedListScreen from "./OrderedListScreen";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminScreen() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const key = useLocation().search ? (useLocation().search).split('=')[1] : 'users'
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let keyword = useLocation().hash ? useLocation().hash.split('#')[1] : '?keyword=&page=1'

    return (
        <div>

            <Tab.Container id="left-tabs-example" defaultActiveKey={key}  style={{textOverflow:"ellipsis"}}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="users"><i className="fas fa-users fa-2x"/> USERS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="categories"><i className="fas fa-copy fa-2x"/> CATEGORIES</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="books"><i className="fas fa-book fa-2x"/> BOOKS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="buying"><i
                                    className="fas fa-shopping-cart fa-2x"/> BUYINGS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="borrowing"><i
                                    className="fas fa-paperclip fa-2x"/> BORROWINGS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders"><i
                                    className="fas fa-clipboard-list fa-2x"></i> ORDERS</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content animation='true'>
                            <Tab.Pane eventKey="users">
                                <h2 style={{marginTop: '3%'}}>USERS</h2>
                                <UserListScreen/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="categories">
                                <h2 style={{marginTop: '3%'}}>CATEGORIES</h2>
                                <CategoryListScreen/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="books">
                                <h2 style={{marginTop: '3%'}}>BOOKS</h2>
                                <BookListScreen keyword={keyword} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="buying">
                                <h2 style={{margin: '3%'}}>BUYINGS</h2>
                                <BuyingListScreen/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="borrowing">
                                <h2 style={{margin: '3%'}}>BORROWINGS</h2>
                                <BorrowListScreen/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <h2 style={{margin: '3%'}}>ORDERS</h2>
                                <OrderedListScreen />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}

export default AdminScreen