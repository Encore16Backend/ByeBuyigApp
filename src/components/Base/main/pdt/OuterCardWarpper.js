import React from "react";
import { useSelector } from "react-redux";
import MyCard from "../MyCard";

const OuterCardWrapper = ({cata})=>{
    const OuterItem = useSelector(
            (state)=>{
                return state.bestOuterItem.items
            }
        )
    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < OuterItem.length; i++){
            result.push(<MyCard key={OuterItem[i]['itemid']} 
                categories = {OuterItem[i]['categories']} 
                itemid = {OuterItem[i]['itemid']} 
                itemname = {OuterItem[i]['itemname']} 
                description = {OuterItem[i]['description']} 
                price = {OuterItem[i]['price']} 
                purchasecnt = {OuterItem[i]['purchasecnt']} 
                images = {OuterItem[i]['images']} 
                reviewmean = {OuterItem[i]['reviewmean']} 
                />);
        }
        return result;
    };

    return(
        <>
        {
             (OuterItem.length != 0 ? pdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
        </>
    )
}

export default OuterCardWrapper