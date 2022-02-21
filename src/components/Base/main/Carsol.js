import React from "react";
import {Carousel} from "react-bootstrap"


const Carsol = ({images})=>{

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