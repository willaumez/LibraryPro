import React from "react";
import { Paginator } from 'react-bootstrap'
import { Pagination } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({pages, page, keyword = '', isAdmin = false, category}) {

    if (keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    return(pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) =>(
                <LinkContainer key={x + 1} to={
                    category ? `/?category=${category}&page=${x + 1}`
                    :!isAdmin ? `/?keyword=${keyword}&page=${x + 1}`
                    : `#?keyword=${keyword}&page=${x + 1}`
                }>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    ))
}

export default Paginate