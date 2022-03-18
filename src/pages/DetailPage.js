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
import { addInquiry } from "../redux/inquiry/actions";
import {addInquiryPages} from "../redux/inquiry/actions"
import ImageSlide from "../components/detail/ImageSlide";
import {addOneItems} from "../redux/oneItem/actions"
import "../axiosproperties"


const DetailPage = ()=>{


    const dispatch = useDispatch()
    const [desc , setDesc] = useState('DESC')
    const [data, setDate] = useState('date')
    const [page, setPage] = useState(1)

    console.log(page, "전역")


    
     // 리뷰값 받아오기
     const GetReviewItem = async (itmeid, asc, sort, page) =>{
        console.log(page, "리뷰")
        await axios.get('/review/byItemid',{
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

    // 문의사항 받아오기
    const GetInquiryItem = async (itmeid, page)=>{
        console.log(page, "문의사항")
        await axios.get('/inquiry/byItemid',{
           params:{
            itemid : itmeid,
            page:page
           }
        },{
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            console.log(res.data.content, "문의사항"+page)
            dispatch(addInquiry(res.data.content))
            dispatch(addInquiryPages(res.data.totalPages))
        }).catch(error => {
            console.log(error, ' GetInquiryItem 에러');
        })
    }

    // 상품 하나 검색해서 받아오기
    const GetOneItem = async (itmeid) =>{
        await axios.get('/main/item',{
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
    

    GetBestItems("/main/bestItem")
    const [lendering , setLandering] = useState(false)

    // 이미지를 받아오기
    const itemId = locationState.itemid

    // 리뷰 가져오는 hook
    GetReviewItem(itemId, desc, data, page)
    // 문의사항 가져오는 hook
    GetInquiryItem(itemId,page)

    // 최초한번 들어왔을떄 이미지를 가지고있음
    useEffect(()=>{
        GetOneItem(itemId)
    },[])
    // const locationsStateHook = useSelector(state => state.oneItem.item);
    const imgs = useSelector(state => state.oneItem.item.images);


    // 문의사항과 댓글 토글
    const [isReview , setIsReview] = useState(true)

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
                    <MakeReview setIsReview={setIsReview} isReview={isReview} pdtState = {locationState} lendering={lendering} setLandering={setLandering} />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                <ReviewView setIsReview={setIsReview} isReview={isReview} page={page} lendering={lendering} setLandering={setLandering}  setPage={setPage} setDesc={setDesc}  setDate={setDate} />
                </Col>
            </Row>
        </Container>
        </>
    )
}


export default DetailPage;