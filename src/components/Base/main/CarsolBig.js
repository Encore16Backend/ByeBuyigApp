import React from "react";
import {Carousel} from "react-bootstrap"


const CarsolBig = ({images})=>{

    console.log(images, "imgs")
    // 배열안에 .imgid .imgpath

    {/* 댓글들 받아와서 반복문 돌림*/}
    const render = images.map((img,index)  =>{
        return(
                <Carousel.Item key={"imgItem"+img.imgid} >
                    <img
                        className="d-block w-100 main_img"
                        src={img.imgpath}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3  key={"itemTitle"+img.imgid}></h3>
                    </Carousel.Caption>
                </Carousel.Item>
        )
    })
    
    return(
    <Carousel fade>
        
        {render}

        {/* <Carousel.Item>
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
        </Carousel.Item> */}
    </Carousel>
    )
}

export default CarsolBig