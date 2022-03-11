import React from "react";
import { Container, Table, Card, Row, Col } from "react-bootstrap";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Carsol from "../components/Base/main/Carsol";


const ShowOrderResult = ({})=>{

    const history = useHistory();
    const location = useLocation();
    const orderList = location.state;

    console.log(orderList,"orderList")

    const render = orderList.map((order, idx)=>{

        return(
            <>
            <div style={{display:"inline-block"}} className="centered">
            <p> <b>  {order.itemname} </b> </p>
                <img style={{display:"inline",width:"200px", height:"200px"}} src={order.itemimg}></img>
                <div style={{display:"inline-block", paddingLeft:"1rem", verticalAlign:"top"}}>
                    <p> 상품금액 : {order.itemprice}</p>
                    <p> 주문수량 : {order.bcount}개</p>
                </div>
            </div>
            <br/>
            </>
        )
    })
    
    return(
        <div>
            <Container>
                <br/><br/>
                <div style={{background:"gainsboro", width:"100%", height:"100px"}}>
                <h2 className="centered" style={{paddingTop:"30px"}}>{sessionStorage.getItem('id')}님의 주문이 완료되었습니다</h2>
                </div>
                <br/>
                
                <Row>
                    <Col sm={7}>배송지 정보
                    
                    </Col>
                    <Col sm={5}>
                        <div>
                            {orderList ? render : ""}
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default ShowOrderResult

