import React from "react";
import {Spinner} from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay-ts'

const spinner = () => {
    return (
        <Spinner animation="border" variant="success" role="status"
                 style={{height: '80px', width: '80px', margin: "auto", display: "block", marginTop: "25%"}}>
            <span style={{textAlign: "center", fontStyle: "italic", marginTop: "25%", color: "green"}}
                  className='sr-only'
            > Loading...</span>

        </Spinner>
    )
}

function Loader() {
    return (
        <LoadingOverlay active={true} spinner={spinner()} text="Loading...">

        </LoadingOverlay>

    )

}

export default Loader