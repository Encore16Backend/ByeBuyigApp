import react, { useEffect, useState } from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux'
import postRefresh from "../hooks/postRefresh";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import MyCard from "../components/Base/main/MyCard";
import MyPage from "./MyPage";
import SideBar from "../components/sidebar";
import Carsol from "../components/Base/main/Carsol";
import GetMainItems from "../hooks/GetMainItems"
import CardWrapper from "../components/Base/main/CardWrapper";
import BestCardWrapper from "../components/Base/main/BestCarpWrapper";
import GetBestItems from "../hooks/GetBestItems";

const Home = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
    console.log('Home 랜더링')

    const [Homelendering , setHomeLandering] = useState(false)

    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/bestItem')
    // 상의 Best 기본값 구매수
    const [BestTopUrl, setBestTop] = useState('/main/category/purchase?category=9')
    // 하의 Best 기본값 구매수
    const [PantsPantsUrl, setBestPants] = useState('/main/category/purchase?category=12')
    // 이우터 Best 기본값 구매수
    const [BestOuterUrl, setBestOuter] = useState('/main/category/purchase?category=15')


    // 베스트 아이템들 (기본 url 후기Best) 전체 Best
    GetBestItems(BestItemUrl)
    // 일반 모든 상품
    GetMainItems()

    console.log('Home 랜더링 종료')
    return(
        <>
        <Container className="container centered">
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/>
                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
                            {/* best상품을 렌더링 할 component */}
                        </div>
                    </Row>
                        <br/><br/><br/><br/>
                    <Row>
                        <h1 className="centered" >ALL PRODUCT</h1>
                        <div className="pdts">
                            <CardWrapper cata={"basic"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering} />
                            {/* 일반상품을 렌더링할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}





export default react.memo(Home);