import React from "react";
import { useSelector } from "react-redux";
import MyCard from "../MyCard";

const PantsCardWrapper = ({cata})=>{
    const PantsItem = useSelector(
            (state)=>{
                return state.bestPantsItem.items
            }
        )
    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < PantsItem.length; i++){
            result.push(<MyCard key={PantsItem[i]['itemid']} 
                categories = {PantsItem[i]['categories']} 
                itemid = {PantsItem[i]['itemid']} 
                itemname = {PantsItem[i]['itemname']} 
                description = {PantsItem[i]['description']} 
                price = {PantsItem[i]['price']} 
                purchasecnt = {PantsItem[i]['purchasecnt']} 
                images = {PantsItem[i]['images']} 
                reviewmean = {PantsItem[i]['reviewmean']} 
                />);
        }
        return result;
    };

    return(
        <>
        {
            (PantsItem.length != 0 ? pdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
        </>
    )
}

export default PantsCardWrapper