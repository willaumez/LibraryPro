import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listCategoryDetails} from "../actions/categoryActions";
import {useLocation, useParams} from "react-router-dom";


export const GetCategory = (id) => {

    const [categ, setCateg] = useState({})
    const Category = async () => {
        const data = await axios.get(`/api/category/${id}`)
        setCateg(data.data)
    }
    Category()
    console.log('Category2----------------:', categ)
    return categ
}


