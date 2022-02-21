import React from "react";
import { useSelector } from "react-redux";
import MyCard from "./MyCard";

const BestCardWrapper = ({cata})=>{

    const BestItems = useSelector(
            (state)=>{
                return state.bestItem.items
            }
        )

    const pdtRendering = ()=>{
        const result = [];
        for (let i =0; i < BestItems.length; i++){
            
            result.push(<MyCard key={BestItems[i]['itemid']} 
                categories = {BestItems[i]['categories']} 
                itemid = {BestItems[i]['itemid']} 
                itemname = {BestItems[i]['itemname']} 
                description = {BestItems[i]['description']} 
                price = {BestItems[i]['price']} 
                purchasecnt = {BestItems[i]['purchasecnt']} 
                images = {BestItems[i]['images']} 
                reviewmean = {BestItems[i]['reviewmean']} 
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

export default BestCardWrapper