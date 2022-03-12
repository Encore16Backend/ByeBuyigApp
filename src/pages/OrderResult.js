import React, { useState } from "react";
import { Container, Table, Card, Row, Col } from "react-bootstrap";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Carsol from "../components/Base/main/Carsol";


const ShowOrderResult = ({})=>{

    const history = useHistory();
    const location = useLocation();
    const orderList = location.state.orderItems;
    const postNum = location.state.addr

    // sessionStorage.setItem('addrNameBasic', "기본배송지")
    //       sessionStorage.setItem('isZoneCodeBasic', {isZoneCode})
    //       sessionStorage.setItem('isAddressBasic', {isAddress})
    //       sessionStorage.setItem('detailAddressBasic', {detailAddress})
    //     }else if (addpost === 1){
    //       // sessionStorage.setItem('addr1', {posttitle}+'/'+{isZoneCode1}+'/'+{isAddress1}+'/'+{detailAddress1})
    //       sessionStorage.setItem('addrName1', {posttitle})
    //       sessionStorage.setItem('isZoneCode1', {isZoneCode1})
    //       sessionStorage.setItem('isAddress1', {isAddress1})
    //       sessionStorage.setItem('detailAddress1', {detailAddress1})
    //     }else{
    //       // sessionStorage.setItem('addr2', {posttitle1}+'/'+{isZoneCode2}+'/'+{isAddress2}+'/'+{detailAddress2})
    //       sessionStorage.setItem('addrName2', {posttitle1})
    //       sessionStorage.setItem('isZoneCode2', {isZoneCode2})
    //       sessionStorage.setItem('isAddress2', {isAddress2})
    //       sessionStorage.setItem('detailAddress2', {detailAddress2})
    let addrName = ''
    let zonecode = ''
    let addr = ''
    let detailAddr = ''

    if (postNum === 0){
        addrName = sessionStorage.getItem('addrNameBasic')
        zonecode = sessionStorage.getItem('isZoneCodeBasic')
        addr = sessionStorage.getItem('isAddressBasic')
        detailAddr = sessionStorage.getItem('detailAddressBasic')
    }else if (postNum === 1){
        addrName = sessionStorage.getItem('addrName1')
        zonecode = sessionStorage.getItem('isZoneCode1')
        addr = sessionStorage.getItem('isAddress1')
        detailAddr = sessionStorage.getItem('detailAddress1')
    }else{
        addrName = sessionStorage.getItem('addrName2')
        zonecode = sessionStorage.getItem('isZoneCode2')
        addr = sessionStorage.getItem('isAddress2')
        detailAddr = sessionStorage.getItem('detailAddress2')
    }


    console.log(postNum,"postNum")
    console.log(orderList,"orderList")

    let sum = 0

    const render = orderList.map((order, idx)=>{

        sum += order.bcount * order.itemprice
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
                    <Col sm={7}>
                        <br/><br/><br/>
                        <div>
                            <div style={{display:"inline", paddingRight:"2rem"}}>
                                <b>배송지 정보</b> 
                            </div>
                            <div style={{display:"inline"}}>
                                {addrName} {zonecode} {addr} {detailAddr}
                            </div>
                        </div>
                        <br/><br/>
                        <div>
                            <div style={{display:"inline", paddingRight:"2rem"}}>
                                <b>입금계좌안내</b> 
                            </div>
                            <div style={{display:"inline"}}>
                                신한은행 110-342-340213 
                                <br/>
                            </div>
                        </div>
                        <br/><br/>
                        <div>
                            <div style={{display:"inline", paddingRight:"2rem"}}>
                                <b>총 결제 금액</b> 
                            </div>
                            <div style={{display:"inline"}}>
                                {sum}원
                                <br/>
                            </div>
                        </div>
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

