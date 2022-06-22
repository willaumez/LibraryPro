import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Book from "../components/Book";
import {listBooks} from "../actions/bookActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useLocation, useParams} from "react-router-dom";
import {listCategoryDetails} from "../actions/categoryActions";
import SearchCategory from "../components/SearchCategory";
import Paginate from "../components/Paginate";

function HomeScreen() {
    const dispatch = useDispatch()
    const keyword = useLocation().search
    const [cate, setCate] = useState('')
    const [cat, setCat] = useState('')

    const booklist = useSelector(state => state.bookList)
    const {error, loading, books, page, pages} = booklist

    const categoryDetails = useSelector(state => state.categoryDetails)
    const {category} = categoryDetails


    if (keyword.includes("category") && !keyword.includes("page") && !keyword.includes("keyword") && keyword.split('=')[1] !== cate) {
        setCate(keyword.split('=')[1])
    }
    if (keyword.includes("category") && !keyword.includes("page") && !cat){
        setCate(keyword.split('=')[1].split('&')[0])
        setCat(cate)
    }



    useEffect(() => {
        dispatch(listBooks(keyword))
        if (cate) {
            dispatch(listCategoryDetails(cate))
        }


    }, [cate, dispatch, keyword])

    return (
        <div>
            <SearchCategory/>
            {keyword.includes("category") && !keyword.includes("keyword") ? (<h1>{category.nom}</h1>) : (
                <h1>BOOKS</h1>
            )}
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    :
                    <div>
                        <Row>
                            {books.map(book => (
                                <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                                    <Book book={book}/>
                                </Col>
                            ))}
                        </Row>
                        {keyword.includes("category") ? (
                            <Paginate page={page} pages={pages} category={cate} />
                        ):(
                            <Paginate page={page} pages={pages} keyword={keyword} />
                        )}

                    </div>
            }
        </div>
    )
}

export default HomeScreen