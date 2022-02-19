import react, { useState } from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux'
import postRefresh from "../hooks/postRefresh";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import MyCard from "../components/Base/main/MyCard";
import MyPage from "./MyPage";
import carsol from "../components/Base/main/Carsol";

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
    

    return(
        <>
        {/* 비밀번호 뺴고 다 보내야함 */}
        <br></br><br></br>
        <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Carousel fade>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 main_img"
                            src="img/1.jpg"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>상품메인사진</h3>
                            <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 main_img"
                            src="img/2.jpg"
                            alt="Second slide"
                            />
                            <Carousel.Caption>
                            <h3>상품사진2</h3>
                            <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100  main_img"
                            src="img/3.jpg"
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>상품사진3</h3>
                            <p></p>
                        </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                        <Card.Title>상품이름</Card.Title>
                        <Card.Text>
                           상품설명
                        </Card.Text>
                </Card.Body>
        </Card>
        
        
        
        </>
    )
}


export default Home;