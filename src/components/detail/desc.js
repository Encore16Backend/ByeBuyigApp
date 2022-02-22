import React from "react";

const DetailDesc = ({pdtState})=>{


    const desc = pdtState.description
    const itemname = pdtState.itemname
    const purchasecnt = pdtState.purchasecnt
    const price = pdtState.price
    const reviewmean = pdtState.reviewmean
    const itemid = pdtState.itemid

    return(
        <>  
        <div>
            <h1>Product Info</h1>
            <br/><br/>
            <p> 상품명/품번 : <b>{itemname}/{itemid}</b> </p>
            <p> 평점 : <b>{reviewmean}</b> </p>
            <p> 설명 : <b>{desc}</b>  </p>
            <p> 가격 : <b>{price}</b> </p>
            <p> 구매수 : <b>{purchasecnt}</b> </p>
        </div>
        </>
    )
}

export default DetailDesc