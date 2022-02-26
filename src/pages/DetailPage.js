import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DetailDesc from "../components/detail/desc";
import MakeReview from "../components/detail/makereview";
import ReviewView from "../components/detail/reviewview";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import GetBestItems from "../hooks/GetBestItems";
import axios from "axios";
import { addReview } from "../redux/reviews/actions";
import GetMainItems from "../hooks/GetMainItems";
import CarsolBig from "../components/Base/main/CarsolBig";


const DetailPage = ()=>{
    const dispatch = useDispatch()

    const [desc , setDesc] = useState('DESC')
    const [data, setDate] = useState('date')
    const [page, setPage] = useState(1)
    
     // 리뷰값 받아오기
     const GetReviewItem = async (name, asc, sort, page) =>{
        alert(name)
        alert(asc)
        alert(sort)
        alert(page)
        await axios.get('http://127.0.0.1:8081/review/byItemname',{
           params:{
            itemname:name,
            asc:asc,
            sortname:sort,
            page:page
           }
        },{
            headers: {
                "Content-Type": "application/json",
                
            }
        }).then(res => {
            console.log(res.data.content , "GetReviewItem 데이터입니다")
            console.log(name, asc, sort, page)
            dispatch(addReview(res.data.content))
        }).catch(error => {
            console.log(error, ' GetReviewItem 에러');
        })
      }


    const location = useLocation()
    const locationState = location.state
    

    GetBestItems("/main/bestItem")
    GetMainItems()

    const [lendering , setLandering] = useState(false)

    // const itemid = locationState.itemid
    const imgs = locationState.images
    const itemname = locationState.itemname
    // const purchasecnt = locationState.purchasecnt
    // const price = locationState.price
    // const reviewmean = locationState.reviewmean
    // const setHomeLandering = locationState.setHomeLandering
    // const HomeLandering = locationState.HomeLandering

    GetReviewItem(itemname, desc, data, page)


    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                <br/><br/><br/><br/><br/>
                <h3>{itemname}</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <CarsolBig images={imgs}/>
                </Col>
                <Col xs={6} md={6}>
                    <DetailDesc pdtState = {locationState} lendering={lendering} setLandering={setLandering}/>
                </Col>
            </Row>
            <br/><br/><br/><br/>
            <Row>
                <Col sm={12}>
                    <MakeReview pdtState = {locationState} lendering={lendering} setLandering={setLandering} />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                <ReviewView lendering={lendering} setLandering={setLandering}  setPage={setPage} setDesc={setDesc}  setDate={setDate} />
                </Col>
            </Row>
        </Container>
        </>
    )
}


export default DetailPage;