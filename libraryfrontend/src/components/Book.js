import React, {useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listCategoryDetails} from "../actions/categoryActions";
import axios from "axios";
import {GetCategory} from "./GetCategoryName";


function Book({book}) {


    return (
        <Card className="my-3 p-2" style={{textAlign: "center", borderRadius: 30, boxShadow:'2px 2px 2px 2px green'}}>
            <Link to={`/book/${book._id}`} style={{borderRadius: 30}}>
                <Card.Img src={book.image}
                          style={{height: 430}}/>
            </Link>
            <Card.Body>
                <Link to={`/book/${book._id}`}>
                    <Card.Title as="div">
                         {book.title}
                    </Card.Title>
                </Link>
                <div className="my-3">
                    {book.author}
                </div>
                <Row>
                    <Col>
                        <div>
                            {book.categoryName}
                        </div>
                    </Col>
                    <Col>
                        <div className="text-success">
                            <strong>{book.qte > 0 ? <div style={{color: "green"}}>In Stock</div> :
                                <div style={{color: "red"}}>Out of Stock </div>}</strong>
                        </div>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )

}

export default Book