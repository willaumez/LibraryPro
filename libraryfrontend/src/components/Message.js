import React from "react";
import {Alert} from "react-bootstrap";

function Message({ variant, children }) {
    return(
        <Alert variant={variant} style={{textAlign:"center",fontStyle:"italic",marginTop:"8%", color:"red"}}>
            {children}
        </Alert>
    )

}
export default Message