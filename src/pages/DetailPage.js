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
import ImageSlide from "../components/detail/ImageSlide";


const DetailPage = ()=>{
    const dispatch = useDispatch()

    const [desc , setDesc] = useState('DESC')
    const [data, setDate] = useState('date')
    const [page, setPage] = useState(1)
    
     // 리뷰값 받아오기
     const GetReviewItem = async (name, asc, sort, page) =>{
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

    const imgs = locationState.images
    const itemname = locationState.itemname


    GetReviewItem(itemname, desc, data, page)


    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                <br/><br/><br/><br/><br/>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <ImageSlide images={imgs} itemname={itemname} />
                </Col>
                <Col xs={6} md={6}>
                    <DetailDesc pdtState={locationState} lendering={lendering} setLandering={setLandering}/>
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
                <ReviewView page={page} pdtState = {locationState} lendering={lendering} setLandering={setLandering}  setPage={setPage} setDesc={setDesc}  setDate={setDate} />
                </Col>
            </Row>
        </Container>
        </>
    )
}


export default DetailPage;