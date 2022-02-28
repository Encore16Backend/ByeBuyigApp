import React from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "bootstrap";
import Carsol from "./Carsol";
import cardComponent from "../../../css/mycard.css"
import { Link, NavLink, Route } from 'react-router-dom';

const MyCard = ({categories, itemid, itemname, description, price, purchasecnt, images, reviewmean,  setHomeLandering ,
    HomeLandering})=>{

    return(
        <div className="cardComponent" >
        <Card style={{ width: '13rem' }}>
                <Card.Body className="cBody">
                    <Carsol images = {images}/>
                    <Link to={{ pathname:"/detail", search : "?itemid="+itemid,
                    state : {
                        categories:categories,
                        itemid : itemid,
                        itemname : itemname,
                        description : description,
                        price : price,
                        purchasecnt : purchasecnt,
                        images : images,
                        reviewmean : reviewmean,
                    },
                    }}>
                    <Card.Title> {itemname.substring(0,20)}... </Card.Title>
                    </Link>
                        <br/>
                        <Card.Subtitle className="mb-2 text-muted">가격 : {price}</Card.Subtitle>
                        <Card.Text>
                           {description}
                        </Card.Text>
                        <Card.Text>
                           
                        </Card.Text>
                        <Card.Text>
                           평점 : {reviewmean}
                        </Card.Text>
                </Card.Body>
        </Card>
        </div>
    )
}

export default MyCard;