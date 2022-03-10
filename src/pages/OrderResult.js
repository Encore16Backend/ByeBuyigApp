import React from "react";
import { Container } from "react-bootstrap";
import {useSelector} from "react-redux";

const ShowOrderResult = ()=>{

    const showOrderList = useSelector(state => state.order.items)

    console.log(showOrderList, "showOrderListshowOrderListshowOrderList")

    return(
        <div>
            <Container>

            </Container>
        </div>
    )
}

export default ShowOrderResult