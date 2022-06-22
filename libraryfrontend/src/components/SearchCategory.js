import React, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {listCategories} from "../actions/categoryActions";

function SearchCategory() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const {loading, error, categories} = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])


    const submitHandler = (cateId) => {
        navigate(`/?category=${cateId}`)
    }


    return (
        <div className="scrollmenu">
            {categories.map(category => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <Button key={category._id} onClick={(e) => submitHandler(category._id)}> {category.nom} </Button>
            ))}
        </div>
    )
}

export default SearchCategory