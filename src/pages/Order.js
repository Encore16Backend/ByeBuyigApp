import axios from "axios";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import {Form, Button, Table, Row, Col} from 'react-bootstrap'
import Page from "../components/Base/main/Page";
// import Calendar from "react-calendar";
import moment from "moment";
// import 'react-calendar/dist/Calendar.css';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../axiosproperties'
import MyCalendar from "../components/etc/MyCalendar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";



const Order = ()=>{


    // 내 주문내역들
    const userid = sessionStorage.getItem("id");
    let [pageNo, setPathNo] = useState(1);
    let [totalPageNo, setTotalPageNo] = useState();

    // 구매목록PK
    const [checkBaskets, setCheckBaskets] = useState([]);
    // 아이템PK
    const [checkItems, setCheckItems] = useState([]);
    // 받아온 구매목록 배열
    const [AllOrderNum, setAllOrderNum] = useState(0);

    
    // 구매내역 배열
    let [myOrderItems, setMyOrderItems] = useState([])

    // 체크박스 체크하면
    const reviewCheck = (checked, basketid, itemid) => {
        if (checked) {
            setCheckBaskets([...checkBaskets, basketid]);
            setCheckItems([...checkItems, itemid]);
            
        } else {
            // 체크 해제
            setCheckBaskets(checkBaskets.filter((x) => x !== basketid));
            setCheckItems(checkItems.filter((x) => x != itemid));
        }
    }
    const allBasketCheck = (checked) => {
        if (checked) {
            const basketid = []; // `checkbox-${reviewid}`
            const itemid = [];
            const orderid = [];
            myOrderItems.forEach((res) => {
                basketid.push(res.id);
                itemid.push(res.itemid);
                orderid.push(res)
            });
            setCheckBaskets(basketid);
            setCheckItems(itemid);
            
        } else {
            // 전체 체크 박스 제거
            setCheckBaskets([]);
            setCheckItems([]);
        }
    }

     // 페이징함수
     const handlePage = (value) => {
        setPathNo(value);
    }


    // 장바구니 받아오는 axios
    const GetOrderItem = async (userid, pageNo) => {
        setIsDate(false)
        await axios.get('/orderHistory/byUsername', {
            params: {
                username: userid,
                page: pageNo
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            const data = res.data
            console.log(data);
            setTotalPageNo(data.totalPages);
            setMyOrderItems(data.content)
            // setUpdateItem(data.content)
            setAllOrderNum(data.content.length)
            // dispatch(addBasket(res.data.content))
        }).catch(error => {
            console.log(error, ' GetOrderItem 에러');
        })
    }

    // 구매내역에서 삭제
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(checkBaskets, "checkBaskets")
        await axios.delete("/orderHistory/delete", {
            params: {
                basketid: checkBaskets
            }
        }).then(res => {
            setCheckItems([])
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    // 날짜검색
    const searchDate = async (userid, pageNo, startDate, endDate) => {
        setIsDate(true)
        await axios.get('/orderHistory/byDate', {
            params: {
                username: userid,
                page: pageNo,
                start : getStringDate(startDate),
                end : getStringDate(endDate)
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            const data = res.data

            setTotalPageNo(data.totalPages);
            setAllOrderNum(data.content.length)
            setMyOrderItems(data.content)
            

        }).catch(error => {
            console.log(error, ' searchDate 에러');
        })
    }


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const isSameDay = (target1, target2) => 
    { return target1.getFullYear() === target2.getFullYear() && target1.getMonth() === target2.getMonth() && target1.getDate()=== target2.getDate(); }





    // 최초 들어올때는 전체조회 useEffect
    useEffect(()=>{
        GetOrderItem(userid, pageNo)
    }, [])

    // 날짜가 바뀌면 날짜검색으로 useEffect (startDate, endDate)
    useEffect(()=>{
        setPathNo(1)
        searchDate(userid, pageNo, startDate, endDate)
    }, [startDate, endDate])

    // 전체검색 버튼을 누르면 다시 전체조회
    const getAllOrder = ()=>{
        setPathNo(1)
        GetOrderItem(userid, pageNo)
    }

    // 페이징 번호가 바뀌면 .. 날짜상태인기 전체상태인지 확인하는 state를 만들어 state확인 후 
    const [isDate, setIsDate] = useState(false)
    useEffect(()=>{
        if (isDate){    
            searchDate(userid, pageNo, startDate, endDate)
        }else{
            GetOrderItem(userid, pageNo)
        }
    }, [pageNo])



    const getStringDate = (localeDate)=>{
        // Wed Mar 23 2022 10:21:20 GMT+0900 (한국 표준시)
        const tmp = JSON.stringify(localeDate)
        const strDate = tmp.slice(1, 11)
        return strDate
    }



    


    return(
        <div>
            <Container>
                
            <Form className='review' onSubmit={onSubmit}>
            <Row>
                 <Col xs={12} md={8}>
                 <div className='title'>구매내역</div>
                </Col>
                < Col xs={6} md={4} style={{paddingTop:"10px"}} >
                <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}  />      
                <Button onClick={getAllOrder}>전체조회</Button>
                </Col>
            </Row>
                
                {
                    !!myOrderItems ? "" : <div>
                    <Button type="submit" className="remove" variant="secondary" size="sm" style={{position:"relative", right:"5px"}} >삭제</Button>
                </div>
                }
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>상품정보</th>
                                <th>배송지</th>
                                <th>가격</th>
                                <th colSpan={2}>수량</th>
                                <th>결제가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                (myOrderItems.length != 0) ? myOrderItems.map((data, idx) => {
                                    let bcount = data.bcount
                                    let id = data.id
                                    let itemid = data.itemid
                                    let itemimg = data.itemimg
                                    let itemname = data.itemname
                                    let itemprice = data.itemprice
                                    let addr = data.location
                                    console.log(typeof(addr))

                                    let reviewData =
                                        <tr key={id}>
                                            <td>
                                                <img src={itemimg} width="80" height="96" style={{ marginRight: "5px" }} />
                                            </td>
                                            <td><Link to={{ pathname:"/detail", search : "?itemid="+itemid,state : {itemid : itemid,},}} >
                                                {
                                                    itemname.length > 15 ? (itemname.substring(0,18)+"...") : itemname
                                                }
                                                </Link>
                                            </td>
                                            <td>
                                                {addr}
                                            </td>
                                            <td>{itemprice}</td>
                                            <td colSpan={2} style={{paddingLeft:"20px"}}>
                                                {bcount}
                                            </td>
                                            <td>
                                            {itemprice*bcount}
                                            </td>
                                        </tr>
                                    return (reviewData)
                                }) : <tr><td style={{textAlign:"center", fontSize:"25px"}} colSpan={10}>구매내역이 없습니다</td></tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </Form>
            <div className="centered">
                {
                    totalPageNo != 0 ? <Page
                        setPage={handlePage}
                        totalPage={totalPageNo}
                        selected={pageNo}
                    /> : ""
                }
            </div>
            </Container>
        </div>
    )
}

export default Order