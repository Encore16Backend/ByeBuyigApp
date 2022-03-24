import React, { useState,useEffect } from "react";
import { Container, Table, Card, Row, Col,OverlayTrigger,Tooltip } from "react-bootstrap";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {getStringPrice} from "../axiosproperties";
import '../axiosproperties'
import axios from 'axios'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { relativeTimeRounding } from "moment";


const ShowOrderResult = ({})=>{

    useEffect(()=>{
        axios.post('/flask/recommend', {
            username: sessionStorage.getItem('id')
        }, {
        }).then(res => {
            const data = res.data
            console.log(res)
            setAllItem(data)
            setPrintItem(data.slice(idx, itemCount+idx));
        }).catch(error => {
            console.log(error)
            })
    },[])


    
    const [allItem,setAllItem] =useState([]);
    let [printItem, setPrintItem] = useState([]);
    const [idx, setIdx] = useState(0);
    const itemCount = 5;
    const history = useHistory();
    const location = useLocation();
    const orderList = location.state.orderItems;

    let sum = 0

    const render = orderList.map((order, idx)=>{
        sum += order.bcount * order.itemprice
        return(
            <>
            <div style={{display:"inline-block",padding:"10px 10px 10px 30px"}} className="centered">
            <p> <b>  {order.itemname} </b> </p>
                <img style={{display:"inline",width:"200px", height:"200px"}} src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+order.itemimg}></img>
                <div style={{display:"inline-block", paddingLeft:"1rem", verticalAlign:"top"}}>
                    <p> 상품금액 : {getStringPrice(order.itemprice)}</p>
                    <p> 주문수량 : {order.bcount}개</p>
                </div>
            </div>
            <br/>
            </>
        )
    })

    const prevEvent = () => {
        if(idx == 0)
            return
        const index = idx-1;
        setIdx(index);
        setPrintItem(allItem.slice(index, itemCount+index));
    } 
    
    const nextEvent = () => {
        if(idx == 5)
            return
        const index = idx+1;
        setIdx(index);
        setPrintItem(allItem.slice(index, itemCount+index));
    }


    const imgclick =(itemid)=>{
        if(window.confirm("상품페이지로 이동하시겠습니까?")){
            history.push({
                pathname: "/detail",
                search : "?itemid="+itemid,
                state: {
                    itemid : itemid,
                }
            })
        }
    }



    return(
        <div>
            <Container>
           
                <br/><br/>
                <div style={{background:"gainsboro", width:"100%", height:"100px"}}>
                <h2 className="centered" style={{paddingTop:"30px"}}>{sessionStorage.getItem('id')}님의 주문이 완료되었습니다</h2>
                </div>
                <br/>

                <div style={{display:"flex"}}>
                <Row>
                    <Col sm={5}>
                        <div className="khscrollor" style={{overflow:"auto", width:"550px" ,height:"450px" }}>
                        <div>
                            {orderList ? render : ""}
                        </div>
                        </div>
                    </Col>
                </Row>
                <div style={{position:"relative",top:"50px",left:"50px"}}>
                        <div>
                            <div style={{display:"inline", paddingRight:"2rem"}}>
                                <b>배송지 정보</b> 
                            </div>
                            <div style={{display:"inline"}}>
                                {location.state.addr}
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
                                {getStringPrice(sum)}원
                                <br/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <strong>{sessionStorage.getItem('id')}님에 대한 추천 상품입니다.</strong>
                        </div>
                            {/* 사진 */}
                            <Container style={{paddingTop:"1rem", display:"flex"}} >
                            <div style={{position:"relative",top:"55px"}}>
                            <IoIosArrowBack  size="25" onClick={prevEvent} style={{cursor:"pointer"}}></IoIosArrowBack>
                            </div>
                            {
                                (printItem != 0 ) ? printItem.map((printItem, idx)=>{
                                
                                let hovername = printItem.itemname
                                let getid = printItem.itemid
                                let Adata =
                                <>
                                <img style={{width:"130px",height:"150px",padding:"3px 3px 3px 3px"}}
                                src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+printItem.images[0].imgpath}
                                onClick={()=>imgclick(getid)}>
                                </img>
                                </>
                                return (Adata)
                            }):""
                            }
                             <div style={{position:"relative",top:"55px"}}>
                            <IoIosArrowForward size="25" onClick={nextEvent} style={{cursor:"pointer"}}></IoIosArrowForward>
                            </div>
                            </Container>
                    </div>


                    

                </div>
            </Container>
        </div>
    )
}

export default ShowOrderResult
