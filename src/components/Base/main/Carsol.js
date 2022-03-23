import React from "react";
import {Carousel} from "react-bootstrap"


const Carsol = ({images})=>{
    const render = images.map((img,index)  =>{
        console.log("여기 오나?");
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
    </Carousel>
    )
}

export default Carsol