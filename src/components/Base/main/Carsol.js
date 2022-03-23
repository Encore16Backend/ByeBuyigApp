import React from "react";
import {Carousel} from "react-bootstrap"


const Carsol = ({images})=>{
    
    const render = images.map((img,index)  =>{
        return(
                <Carousel.Item key={"imgItem"+img.imgid} >
                    <img 
                        className="d-block w-100 main_img"
                        src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+img.imgpath}
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
    </Carousel>
    )
}

export default Carsol