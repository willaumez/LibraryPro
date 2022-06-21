import React from "react";
import {Spinner} from "react-bootstrap";

function Loader() {
    return(
        <Spinner animation="border" variant="success" role="status"
                 style={{height:'80px', width:'80px', margin:"auto", display:"block",marginTop:"25%"}}>
            <span style={{textAlign:"center",fontStyle:"italic",marginTop:"25%", color:"green"}}  className='sr-only'
            > Loading...</span>

        </Spinner>

    )
    
}
export default Loader