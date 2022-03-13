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



const Order = ()=>{


    // 2중 선택 달력
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);
    // const onChangeCal = (dates) => {
    //     const [start, end] = dates;
    //     setStartDate(start);
    //     setEndDate(end);
    //     alert(startDate)
    //     alert(endDate)
    // };


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
            setPathNo(1)

        }).catch(error => {
            console.log(error, ' searchDate 에러');
        })
    }


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const isSameDay = (target1, target2) => 
    { return target1.getFullYear() === target2.getFullYear() && target1.getMonth() === target2.getMonth() && target1.getDate()=== target2.getDate(); }


    useEffect(()=>{
        if ( isSameDay(startDate, new Date()) && isSameDay(endDate, new Date())){
            GetOrderItem(userid, pageNo)
        }else{
            searchDate(userid, pageNo, startDate, endDate)
        }
    }, [pageNo, startDate, endDate])




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
                <Col xs={6} md={4}>
                <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}  />                
                </Col>
            </Row>
                
                {
                    !!myOrderItems ? "" : <div>
                    <Button type="submit" className="remove" variant="secondary" size="sm" style={{position:"relative", right:"5px"}} >삭제</Button>
                    <Button type="button" className="remove" variant="secondary" size="sm" >구매 </Button>
                </div>
                }
                <div>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th className="checkBox">
                                    <div>
                                        <Form.Check
                                            type='checkbox' id='checkbox'
                                            onChange={(e) => allBasketCheck(e.target.checked)}
                                            checked={checkBaskets.length === AllOrderNum ? (AllOrderNum === 0 ? false : true) : false}
                                        />
                                    </div>
                                </th> */}
                                <th></th>
                                <th>상품정보</th>
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
                                    let reviewData =
                                        <tr key={id}>
                                            {/* <td className="checkBox">
                                                <Form>
                                                    <div className="checkBox">
                                                        <Form.Check
                                                            type='checkbox' className={`checkbox-${id}`}
                                                            onChange={(e) => reviewCheck(e.target.checked, id, itemid)}
                                                            checked={checkBaskets.includes(id) ? true : false}
                                                        />
                                                    </div>
                                                </Form>
                                            </td> */}
                                            <td>
                                                <img src={itemimg} width="80" height="96" style={{ marginRight: "5px" }} />
                                            </td>
                                            <td>
                                                {itemname}
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