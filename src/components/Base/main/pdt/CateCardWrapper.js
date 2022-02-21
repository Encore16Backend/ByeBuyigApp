import React from "react";
import { useSelector } from "react-redux";
import MyCard from "../MyCard";

const CateCardWrapper = ({cata})=>{
    const cateItem = useSelector(
            (state)=>{
                return state.cateItem.items
            }
        )
    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < cateItem.length; i++){
            result.push(<MyCard key={cateItem[i]['itemid']} 
                categories = {cateItem[i]['categories']} 
                itemid = {cateItem[i]['itemid']} 
                itemname = {cateItem[i]['itemname']} 
                description = {cateItem[i]['description']} 
                price = {cateItem[i]['price']} 
                purchasecnt = {cateItem[i]['purchasecnt']} 
                images = {cateItem[i]['images']} 
                reviewmean = {cateItem[i]['reviewmean']} 
                />);
        }
        return result;
    };

    return(
        <>
            {pdtRendering()}
        </>
    )
}

export default CateCardWrapper