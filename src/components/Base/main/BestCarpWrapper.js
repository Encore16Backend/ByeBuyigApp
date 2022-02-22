import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MyCard from "./MyCard";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import GetBestItems from "../../../hooks/GetBestItems";

const BestCardWrapper = ({cata})=>{
    // 받아온 값들을 렌더링하는 컴포넌

    const all = useSelector(
        (state)=>{      
            return state.bestItem.items
        }
    )
    const top = useSelector(
        (state)=>{      
            return state.bestItem.top
        }
    )
    const bottom = useSelector(
        (state)=>{      
            return state.bestItem.pants
        }
    )
    const outer = useSelector(
        (state)=>{      
            return state.bestItem.outer
        }
    )

    console.log(all, "all")
    

    const allpdtRendering = ()=>{
        const result = []
        for (let i =0; i < all.length; i++){
            result.push(<MyCard key={all[i]['itemid']} 
                categories = {all[i]['categories']} 
                itemid = {all[i]['itemid']} 
                itemname = {all[i]['itemname']} 
                description = {all[i]['description']} 
                price = {all[i]['price']} 
                purchasecnt = {all[i]['purchasecnt']} 
                images = {all[i]['images']} 
                reviewmean = {all[i]['reviewmean']} 
                />);
        }
        return result;
    };

    const outerpdtRendering = ()=>{
        const result = [];
        for (let i =0; i < outer.length; i++){
            result.push(<MyCard key={outer[i]['itemid']} 
                categories = {outer[i]['categories']} 
                itemid = {outer[i]['itemid']} 
                itemname = {outer[i]['itemname']} 
                description = {outer[i]['description']} 
                price = {outer[i]['price']} 
                purchasecnt = {outer[i]['purchasecnt']} 
                images = {outer[i]['images']} 
                reviewmean = {outer[i]['reviewmean']} 
                />);
        }
        return result;
    };

    const bottompdtRendering = ()=>{
        const result = [];
        for (let i =0; i < bottom.length; i++){
            result.push(<MyCard key={bottom[i]['itemid']} 
                categories = {bottom[i]['categories']} 
                itemid = {bottom[i]['itemid']} 
                itemname = {bottom[i]['itemname']} 
                description = {bottom[i]['description']} 
                price = {bottom[i]['price']} 
                purchasecnt = {bottom[i]['purchasecnt']} 
                images = {bottom[i]['images']} 
                reviewmean = {bottom[i]['reviewmean']} 
                />);
        }
        return result;
    };

    const toppdtRendering = ()=>{
        const result = [];
        for (let i =0; i < top.length; i++){
            result.push(<MyCard key={top[i]['itemid']} 
                categories = {top[i]['categories']} 
                itemid = {top[i]['itemid']} 
                itemname = {top[i]['itemname']} 
                description = {top[i]['description']} 
                price = {top[i]['price']} 
                purchasecnt = {top[i]['purchasecnt']} 
                images = {top[i]['images']} 
                reviewmean = {top[i]['reviewmean']} 
                />);
        }
        return result;
    };


    console.log("BestWrapper 끝")
    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
            <h1 className="centered">BEST PRODUCT</h1>
        {
            (all.length !== 0 ? allpdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
            <h1 className="centered">BEST TOP PRODUCT</h1>
        {
            (top.length !== 0 ? toppdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
            <h1 className="centered">BEST PANTS PRODUCT</h1>
        {
            (bottom.length !== 0 ? bottompdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
            <h1 className="centered">BEST OUTER PRODUCT</h1>
        {
            (outer.length !== 0 ? outerpdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
                </Col>
            </Row>

        </Container>
        </>
    )
}

export default BestCardWrapper