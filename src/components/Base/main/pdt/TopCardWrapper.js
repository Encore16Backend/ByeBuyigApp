import React from "react";
import { useSelector } from "react-redux";
import MyCard from "../MyCard";

const TopCardWrapper = ({cata})=>{
    const TopItem = useSelector(
            (state)=>{
                return state.bestTopItem.items
            }
        )
    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < TopItem.length; i++){
            result.push(<MyCard key={TopItem[i]['itemid']} 
                categories = {TopItem[i]['categories']} 
                itemid = {TopItem[i]['itemid']} 
                itemname = {TopItem[i]['itemname']} 
                description = {TopItem[i]['description']} 
                price = {TopItem[i]['price']} 
                purchasecnt = {TopItem[i]['purchasecnt']} 
                images = {TopItem[i]['images']} 
                reviewmean = {TopItem[i]['reviewmean']} 
                />);
        }
        return result;
    };

    return(
        <>
        {
            (TopItem.length != 0 ? pdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
        </>
    )
}

export default TopCardWrapper