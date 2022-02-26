import React from "react";
import {Carousel} from "react-bootstrap"


const Carsol = ({images})=>{

    console.log(images, "imgs")
    // 배열안에 .imgid .imgpath

    
    {/* 댓글들 받아와서 반복문 돌림*/}
    const render = images.map((img,index)  =>{
        return(
            <Carousel fade>
                <Carousel.Item >
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
            </Carousel>
        )
    })
    
    return(
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
            className="d-block w-100 main_img"
            src="img/3.jpg"
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>상품사진3</h3>
            <p></p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    )
}

export default Carsol