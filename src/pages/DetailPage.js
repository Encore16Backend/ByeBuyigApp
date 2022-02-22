import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DetailDesc from "../components/detail/desc";
import MakeReview from "../components/detail/makereview";
import ReviewView from "../components/detail/reviewview";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";



const DetailPage = ()=>{
    const location = useLocation()
    console.log(location.state, "Detail Location")
    const locationState = location.state

    const desc = locationState.description
    const itemname = locationState.itemname
    const purchasecnt = locationState.purchasecnt
    const price = locationState.price
    const reviewmean = locationState.reviewmean
    const imgs = locationState.images
    
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
                <Col xs={12} md={6}>
                상품 사진
                </Col>
                <Col xs={6} md={6}>
                    <DetailDesc pdtState = {locationState}/>
                </Col>
            </Row>
            <br/><br/><br/><br/>
            <Row>
                <Col sm={12}>
                    <div className="centered">
                    <h3>상품 사진...</h3>
                    </div>
                </Col>
            </Row>
            <br/><br/><br/><br/>
            <Row>
                <Col sm={12}>
                    <MakeReview/>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                <ReviewView/>
                </Col>
            </Row>
           
        </Container>
        </>
    )
}


export default DetailPage;