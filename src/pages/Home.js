import react, { useState } from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux'
import postRefresh from "../hooks/postRefresh";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas } from "react-bootstrap";
import MyCard from "../components/Base/main/MyCard";
import MyPage from "./MyPage";
import SideBar from "../components/sidebar";
import Carsol from "../components/Base/main/Carsol";

const Home = ()=>{

// cate 상의 하의 반팔 악세사리

    const arr = [
        {'상품명':'상품1' , '상품이미지':"img/1.jpg", '상품설명': '긴팔' },
        {'상품명':'상품2' , '상품이미지':"img/2.jpg", '상품설명': '반팔' },
        {'상품명':'상품2' , '상품이미지':"img/3.jpg", '상품설명': '반바지' },
        {'상품명':'상품2' , '상품이미지':"img/1.jpg", '상품설명': '긴바지' },
        {'상품명':'상품3' , '상품이미지':"img/3.jpg", '상품설명': '패딩' },
        {'상품명':'상품4' , '상품이미지':"img/2.jpg", '상품설명': '모자' },
        {'상품명':'상품5' , '상품이미지':"img/1.jpg", '상품설명': '긴팔' },
        {'상품명':'상품6' , '상품이미지':"img/3.jpg", '상품설명': '긴바지' },
        {'상품명':'상품7' , '상품이미지':"img/1.jpg", '상품설명': '긴팔' },
    ]


    const weekArr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
    const bestRendering = () => {
      const result = [];
      for (let i = 0; i <4; i++) {
        result.push( <MyCard/> );
      }
      return result;
    };

    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < 12; i++){
            result.push(<MyCard/>);
        }
        return result;
    };

   
    

    return(
        <>
        {/* 비밀번호 뺴고 다 보내야함 */}
        <Container>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/>
                        <h1 className="centered" >BEST PRODUCT</h1>
                        <div className="bestpdts">
                            {bestRendering()}
                        </div>
                    </Row>
                    <br/><br/><br/><br/>
                    <Row>
                        <h1 className="centered" >PRODUCT</h1>
                        <div className="pdts">
                                {pdtRendering()}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        
        
        
        
        </>
    )
}


export default Home;