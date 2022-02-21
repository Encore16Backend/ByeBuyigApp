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
import GetCate from "../hooks/pdtHook/GetCate"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import OuterCardWrapper from "../components/Base/main/pdt/OuterCardWarpper"
import TopCardWrapper from "../components/Base/main/pdt/TopCardWrapper";
import PantsCardWrapper from "../components/Base/main/pdt/PantsCardWrapper";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";


const CateList = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
    const [chk, setChk] = useState({
        flag:false
    }) 
    const location = useLocation();

    useEffect(()=>{
        setChk({
            ...chk,
            flag : !!chk.flag
        })
    }, [location])


    console.log(location, " location");
    const id = location.state.id



    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/category/purchase?category='+id)
    

    // 넘어온 상품
    // GetCate(url)
    GetCate(BestItemUrl)


    // 베스트 아이템들 (기본 url 후기Best) 전체 Best


    // 후기 판매량, 가격에서 best상품을 가져오도록 url을 수정하는 함수
    const changeBestItemUrl = (url)=>{
        setBestItemUrl(url)
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
                                changeBestItemUrl("/main/category/review?category="+id)
                               
                            }} variant="secondary">후기</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/category/price1?category="+id)
                            
                            }}  variant="secondary">높은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/category/price2?category="+id)
                             
                            }}  variant="secondary">낮은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/category/purchase?category="+id)
                             
                            }} variant="secondary">판매량</span>
                        </div>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"catapdt"}/>
                            {/* id로 받은 상품을 렌더링 할 component */}
                        </div>
                    </Row>

                   
                </Col>
            </Row>
        </Container>
        </>
    )
}





export default react.memo(CateList);