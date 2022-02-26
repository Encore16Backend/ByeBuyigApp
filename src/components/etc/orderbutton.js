import React from "react";

const OrderButton = ()=>{

    return(
        <>
              <br/><br/><br/><br/>
                        <div className="BestButtons">
                            {/* 후기 별점 .. 변경버튼 */}
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/review")
                                changeBestTopItemUrl('/main/category/review?category=9')
                                changeBestPantsItemUrl('/main/category/review?category=12')
                                changeBestOuterItemUrl('/main/category/review?category=15')
                            }} variant="secondary">후기</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/price1")
                                changeBestTopItemUrl('/main/category/price1?category=9')
                                changeBestPantsItemUrl('/main/category/price1?category=12')
                                changeBestOuterItemUrl('/main/category/price1?category=15')
                            }}  variant="secondary">높은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/price2")
                                changeBestTopItemUrl('/main/category/price2?category=9')
                                changeBestPantsItemUrl('/main/category/price2?category=12')
                                changeBestOuterItemUrl('/main/category/price2?category=15')
                            }}  variant="secondary">낮은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeBestItemUrl("/main/order/purchase")
                                changeBestTopItemUrl('/main/category/purchase?category=9')
                                changeBestPantsItemUrl('/main/category/purchase?category=12')
                                changeBestOuterItemUrl('/main/category/purchase?category=15')
                            }} variant="secondary">판매량</span>
                        </div>

                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"}/>
                            {/* best상품을 렌더링 할 component */}
                        </div>
        </>
    )
}