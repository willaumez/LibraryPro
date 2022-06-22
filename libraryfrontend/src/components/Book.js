import React, {useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listCategoryDetails} from "../actions/categoryActions";
import axios from "axios";
import {GetCategory} from "./GetCategoryName";


const proxy = 'https://libraryprojectg2.s3.eu-north-1.amazonaws.com/media/'

function Book({book}) {

    //const [isCate, setIsCate] = useState(false)
    //const category = !isCate ? GetCategory(book.category) : setIsCate(false)


    //console.log('Category2----------------:', category)

    return (
        <Card className="my-3 p-2" style={{textAlign: "center", borderRadius: 30}}>
            <Link to={`/book/${book._id}`}>
                <Card.Img src={`${proxy}${book.image}`}
                          style={{height: 480, borderRadius: '30px 30px 0px 0px'}}/>
            </Link>
            <Card.Body>
                <Link to={`/book/${book._id}`}>
                    <Card.Title as="div">
                        <strong className='titre'> {book.title}</strong>
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