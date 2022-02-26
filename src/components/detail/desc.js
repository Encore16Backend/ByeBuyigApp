import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ReactStars from "react-stars"

const DetailDesc = ({pdtState, lendering, setLandering})=>{

     // 들어온 카테고리의 상세 품목 길이
     const allItem = useSelector(state => state.Item.items)
     

    const desc = pdtState.description
    const itemname = pdtState.itemname
    const purchasecnt = pdtState.purchasecnt
    const price = pdtState.price
    const reviewmean = pdtState.reviewmean
    const itemid = pdtState.itemid
    const temp = pdtState.reviewcount

    const render = allItem.filter(item => item.itemid === itemid)
    const renderedItem = render[0]

    console.log(allItem, "아아아아아아아아아앙")

    const rendering = ()=>{
        return(
        <div>
            <h1>Product Info</h1>
            <br/><br/>
            <p> 상품명/품번 : <b>{renderedItem.itemname}/{renderedItem.itemid}</b> </p>
            <div className="descStar">
                <div>평점 : {renderedItem.reviewmean} </div>
                <div><ReactStars edit={false} value={renderedItem.reviewmean}/></div>
            </div>
            <p> 가격 : <b>{renderedItem.price}</b> </p>
            <p> 구매수 : <b>{renderedItem.purchasecnt}</b> </p>
            <p> 리뷰 수 : {renderedItem.reviewcount}</p>
        </div>
        )
    }
    
    

    return(
        <> 
        {
            (renderedItem != undefined) ? rendering() : <p>실패</p>
        }
            
        </>
    )
}

export default DetailDesc