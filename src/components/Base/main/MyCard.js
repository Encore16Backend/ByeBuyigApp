import React from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "bootstrap";
import Carsol from "./Carsol";

const MyCard = ()=>{

    return(
        <div>

        <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Carsol/>
                        <Card.Title>상품이름</Card.Title>
                        <Card.Text>
                           상품설명
                        </Card.Text>
                </Card.Body>
        </Card>
        </div>
    )
}

export default MyCard;