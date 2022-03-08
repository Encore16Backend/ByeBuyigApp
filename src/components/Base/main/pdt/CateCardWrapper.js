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
                reviewcount={cateItem[i]['reviewcount']}
                />);
        }
        return result;
    };

    return(
        <>
        {
            (cateItem.length !== 0 ? pdtRendering() : <h4 className="centered">해당 상품이 없습니다</h4>)
        }
        </>
    )
}

export default CateCardWrapper