import React from "react";
import { Card } from "react-bootstrap";
import Carsol from "./Carsol";
import "../../../css/mycard.css"
import { Link } from 'react-router-dom';
import ReactStars from "react-stars";

const MyCard = ({categories, itemid, itemname, description, price, purchasecnt, images, reviewmean,  setHomeLandering,
    HomeLandering,reviewcount})=>{
        const modiPrice =price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
        <div className="cardComponent" >
        <Card style={{ width: '12rem' }}>
                <Card.Body className="cBody">
                    <Carsol images = {images}/><br></br>
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
                        reviewcount :reviewcount
                    },
                    }} >
                    <Card.Title> {itemname.substring(0,10)}... </Card.Title>
                    </Link>
                        <br/>
                        <div style={{position:"absolute",bottom:"77px"}} >
                            <Card.Subtitle style={{color:"black"}}>가격 : {modiPrice}원</Card.Subtitle>
                        </div>
                        <div style={{position:"absolute",bottom:"45px"}}>
                            <ReactStars edit={false} value={reviewmean} style={{display:"inline-block"}} />
                        </div>
                        <div style={{position:"absolute",bottom:"15px"}}>
                            <Card.Text>리뷰 : {reviewcount}</Card.Text>
                        </div>
                           
                </Card.Body>
        </Card>
        </div>
    )
}

export default MyCard;