import React from "react";
import { Container } from "react-bootstrap";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const ShowOrderResult = ({})=>{

    const location = useLocation();
    const orderList = location.state;

    console.log(location,"loc")
    const showOrderList = useSelector(state => state.order.items)
    // 구매완료했습니다! 하는 느낌의 페이지 

    const render = showOrderList.map((order, idx)=>{

        return(
            <div>
                <h1>구매완료</h1>
            </div>
        )
    })

    return(
        <div>
            <Container>
                {!!orderList ? "" : render}
            </Container>
        </div>
    )
}

export default ShowOrderResult
