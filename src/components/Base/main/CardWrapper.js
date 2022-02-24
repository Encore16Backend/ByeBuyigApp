import React from "react";
import { useSelector } from "react-redux";
import MyCard from "./MyCard";

const CardWrapper = ({cata})=>{
    
    const BasicItem = useSelector(
            (state)=>{
                return state.Item.items
            }
        )

    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < BasicItem.length; i++){
            result.push(<MyCard key={BasicItem[i]['itemid']} 
                categories = {BasicItem[i]['categories']} 
                itemid = {BasicItem[i]['itemid']} 
                itemname = {BasicItem[i]['itemname']} 
                description = {BasicItem[i]['description']} 
                price = {BasicItem[i]['price']} 
                purchasecnt = {BasicItem[i]['purchasecnt']} 
                images = {BasicItem[i]['images']} 
                reviewmean = {BasicItem[i]['reviewmean']} 
                />);
        }
        return result;
    };

    return(
        <>
        {
            (BasicItem.length != 0 ? pdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
        </>
    )
}

export default CardWrapper