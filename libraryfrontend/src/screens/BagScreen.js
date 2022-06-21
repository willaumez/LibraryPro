import React, {useEffect} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import {Row, Tabs, Tab} from "react-bootstrap";
import BorrowScreen from "./borrowScreen";
import BuyScreen from "./buyScreen";


function BagScreen (){
    const book_id= useParams()["*"];
    const els = useLocation().search
    const qte = els.split('=')[1]
    const navigate = useNavigate()
    let key = 'true'

    if (String(qte) === 'null'){
        key = 'false'
    }
    else {
        key = 'true'
    }

    return(
             <Tabs fill defaultActiveKey={key} id="uncontrolled-tab-example" className="mb-3" style={{marginTop:20}}>
              <Tab eventKey='true' title="BUY" className='py-3' style={{borderColor:"blue"}}>
                    <BuyScreen book_id={book_id} qte={qte} />
              </Tab>

              <Tab eventKey='false' title="BORROWINGS">
                     <BorrowScreen book_id={book_id} qte={String(qte)} />
              </Tab>
            </Tabs>
    )

}
export default BagScreen