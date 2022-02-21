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
import GetBestTop from "../hooks/pdtHook/GetBestTop";
import GetBestPants from "../hooks/pdtHook/GetBestPants";
import GetBestOuter from "../hooks/pdtHook/GetBestOuter";

import OuterCardWrapper from "../components/Base/main/pdt/OuterCardWarpper"
import TopCardWrapper from "../components/Base/main/pdt/TopCardWrapper";
import PantsCardWrapper from "../components/Base/main/pdt/PantsCardWrapper";





const Home = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
    console.log('Home 랜더링')

    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/order/purchase')
    // 상의 Best 기본값 구매수
    const [BestTopUrl, setBestTop] = useState('/main/category/purchase?category=9')
    // 하의 Best 기본값 구매수
    const [PantsPantsUrl, setBestPants] = useState('/main/category/purchase?category=12')
    // 이우터 Best 기본값 구매수
    const [BestOuterUrl, setBestOuter] = useState('/main/category/purchase?category=15')


    // 일반 모든 상품
    GetMainItems()
    // 베스트 아이템들 (기본 url 후기Best) 전체 Best
    GetBestItems(BestItemUrl)
    // 상의 BEST 기본값 구매순
    GetBestTop(BestTopUrl)
    // 하의 Best 기본값 구매순
    GetBestPants(PantsPantsUrl)
    // 아우터 Best 기본값 구매순
    GetBestOuter(BestOuterUrl)


    // 후기 판매량, 가격에서 best상품을 가져오도록 url을 수정하는 함수
    const changeBestItemUrl = (url)=>{
        setBestItemUrl(url)
    }
    const changeBestTopItemUrl = (url)=>{
        setBestTop(url)
    }
    const changeBestPantsItemUrl = (url)=>{
        setBestPants(url)
    }
    const changeBestOuterItemUrl = (url)=>{
        setBestOuter(url)
    }
    
    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/>
                        <h1 className="centered" >BEST PRODUCT</h1>

                        <div className="BestButtons">
                            {/* 후기 별점 .. 변경버튼 */}
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/review")
                                changeBestTopItemUrl('/main/category/review?category=9')
                                changeBestPantsItemUrl('/main/category/review?category=12')
                                changeBestOuterItemUrl('/main/category/review?category=15')
                            }} variant="secondary">후기</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/price1")
                                changeBestTopItemUrl('/main/category/price1?category=9')
                                changeBestPantsItemUrl('/main/category/price1?category=12')
                                changeBestOuterItemUrl('/main/category/price1?category=15')
                            }}  variant="secondary">높은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/price2")
                                changeBestTopItemUrl('/main/category/price2?category=9')
                                changeBestPantsItemUrl('/main/category/price2?category=12')
                                changeBestOuterItemUrl('/main/category/price2?category=15')
                            }}  variant="secondary">낮은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/purchase")
                                changeBestTopItemUrl('/main/category/purchase?category=9')
                                changeBestPantsItemUrl('/main/category/purchase?category=12')
                                changeBestOuterItemUrl('/main/category/purchase?category=15')
                            }} variant="secondary">판매량</span>
                        </div>

                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"}/>
                            {/* best상품을 렌더링 할 component */}
                        </div>
                    </Row>

                    <Row>
                        <h1 className="centered" >BEST TOP</h1>
                        <div className="pdts">
                            <TopCardWrapper cata={"top"}/>
                            {/* BEST TOP 렌더링할 component */}
                        </div>
                    </Row>

                    <Row>
                        <h1 className="centered" >BEST PANTS</h1>
                        <div className="pdts">
                            <PantsCardWrapper cata={"pants"}/>
                            {/* BEST PANTS 렌더링할 component */}
                        </div>
                    </Row>

                    <Row>
                        <h1 className="centered" >BEST OUTER</h1>
                        <div className="pdts">
                            <OuterCardWrapper cata={"outer"}/>
                            {/* BEST OUTER 렌더링할 component */}
                        </div>
                    </Row>
                    
                    <Row>
                        <h1 className="centered" >ALL PRODUCT</h1>
                        <div className="pdts">
                            <CardWrapper cata={"basic"}/>
                            {/* BEST 일반상품을 렌더링할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}





export default react.memo(Home);