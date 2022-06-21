import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword){navigate(`/?keyword=${keyword}&page=1`)}
        else {
            navigate(navigate(navigate.location.pathname))
        }
    }

    return (
        <div>
        <Form onSubmit={submitHandler} className="search-box">
            <button className="btn-search"><i className="fas fa-search"></i></button>
            <input type='text' className="input-search"
                          onChange={(e) => setKeyword(e.target.value)} placeholder="Type to Search..."  style={{color:"green"}}/>
        </Form>

        </div>
    )
}

export default SearchBox