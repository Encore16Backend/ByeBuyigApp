import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DetailDesc from "../components/detail/desc";
import MakeReview from "../components/detail/makereview";
import ReviewView from "../components/detail/reviewview";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import GetBestItems from "../hooks/GetBestItems";
import axios from "axios";
import { addReview } from "../redux/reviews/actions";
import ImageSlide from "../components/detail/ImageSlide";
import {addOneItems} from "../redux/oneItem/actions"


const DetailPage = ()=>{
    const dispatch = useDispatch()
    const [desc , setDesc] = useState('DESC')
    const [data, setDate] = useState('date')
    const [page, setPage] = useState(1)

    
     // 리뷰값 받아오기
     const GetReviewItem = async (itmeid, asc, sort, page) =>{
        await axios.get('http://127.0.0.1:8081/review/byItemid',{
           params:{
            itemid:itmeid,
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

    // 상품 하나 검색해서 받아오기
    const GetOneItem = async (itmeid) =>{
        await axios.get('http://127.0.0.1:8081/main/item',{
           params:{
            itemid:itmeid,
           }
        },{
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            console.log(res, "getOneItem")
            dispatch(addOneItems(res.data))
        }).catch(error => {
            console.log(error, ' GetOneItem 에러');
        })
      }


    const location = useLocation()
    const locationState = location.state

    console.log(locationState, "locationState")
    

    GetBestItems("/main/bestItem")
    // GetMainItems()

    const [lendering , setLandering] = useState(false)

    // 이미지를 받아오기
    const itemId = locationState.itemid

    // 리뷰 가져오는 hook
    GetReviewItem(itemId, desc, data, page)
    // 최초한번 들어왔을떄 이미지를 가지고있음
    useEffect(()=>{
        GetOneItem(itemId)
    },[])
    const locationsStateHook = useSelector(state => state.oneItem.item);
    const imgs = useSelector(state => state.oneItem.item.images);

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
                    <ImageSlide images={imgs} />
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